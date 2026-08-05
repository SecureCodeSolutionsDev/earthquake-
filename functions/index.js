/* =====================================================================
   ZWIN 🔥 — CLOUD FUNCTIONS: push notifications + 🪙 SERVER REFEREE
   ---------------------------------------------------------------------
   The referee makes coins MATHEMATICALLY unhackable:
   - Balances live in wallets/{uid}/coins — users can READ, never WRITE.
   - Every movement (daily, gifts, messages, super, boost, reveal,
     welcome bonus) is validated HERE, server-side.
   - A cheater editing their app files only changes their own wallpaper.

   Deploy: see PHOTOS-PUSH-GUIDE.md (Level 3 + "Lock Coins" section).
   Cost: ~0 DH inside the Blaze free allowance at early scale.
   ===================================================================== */

const { onValueCreated, onValueUpdated } = require('firebase-functions/v2/database');
const { initializeApp } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
const { getMessaging } = require('firebase-admin/messaging');

initializeApp();

const ROOT = 'wasla_dating';               // 🔒 same root chosen for your rules
const TRIGGER = {
  region: 'europe-west1',                  // your Realtime DB location
  instance: 'PASTE_PROJECT-default-rtdb'   // ← replace PASTE_PROJECT with your project id
};

/* Economy — mirror of zwin-config.js coins (keep in sync if you tune prices) */
const ECON = {
  welcomeBonus: 50, dailyFree: 10, streakBonusPct: 10,
  freeChatMsgs: 10, msgCost: 1, superLikeCost: 5,
  giftExclusive: 50, revealLikeCost: 20, boostCost: 15, rewindCost: 3,
  photoBonus: 25, videoBonus: 10, profileBonus: 15
};

const db = () => getDatabase();

/* ---------- vault helpers ---------- */
async function tryDebit(uid, cost) {          // pays only if balance covers it
  const ref = db().ref(`${ROOT}/wallets/${uid}/coins`);
  let paid = false;
  await ref.transaction((v) => {
    const cur = +v || 0;
    if (cur < cost) return v;                  // not enough → no change
    paid = true;
    return Math.round(cur - cost);
  });
  return paid;
}
async function credit(uid, n) {
  await db().ref(`${ROOT}/wallets/${uid}/coins`).transaction((v) => Math.round((+v || 0) + n));
}
async function receipt(uid, obj) {
  await db().ref(`${ROOT}/receipts/${uid}`).push({ ...obj, ts: Date.now() });
}

/* ---------- push helper ---------- */
async function tokensOf(uid) {
  const snap = await db().ref(ROOT + '/fcmTokens/' + uid).get();
  if (!snap.exists()) return [];
  return Object.values(snap.val()).filter((t) => typeof t === 'string' && t.length > 20);
}
async function notify(uid, title, body) {
  const tokens = await tokensOf(uid);
  if (!tokens.length) return;
  await getMessaging().sendEachForMulticast({
    tokens,
    notification: { title, body },
    data: { url: './index.html' }
  });
}

/* =====================================================================
   🪙 REFEREE 1 — welcome bonus when a profile is born
   ===================================================================== */
exports.welcomeCoins = onValueCreated({ ref: `/${ROOT}/users/{uid}`, ...TRIGGER }, async (event) => {
  const w = db().ref(`${ROOT}/wallets/${event.params.uid}/coins`);
  if (!(await w.get()).exists()) await w.set(ECON.welcomeBonus);
});

/* =====================================================================
   🪙 REFEREE 2 — coin requests: daily claim, quests, rewind
   ===================================================================== */
exports.coinRequests = onValueCreated({ ref: `/${ROOT}/coinReq/{uid}/{rid}`, ...TRIGGER }, async (event) => {
  const uid = event.params.uid;
  const req = event.data.val() || {};
  const cleanup = () => event.data.ref.remove();
  const wpath = `${ROOT}/wallets/${uid}`;

  if (req.type === 'daily') {
    const dayMs = 86400000;
    const today = Math.floor((Date.now() + 3600000) / dayMs);   // ≈ Africa/Casablanca day
    const dSnap = await db().ref(wpath + '/daily').get();
    const d = dSnap.val() || { lastDay: 0, streak: 0 };
    if (d.lastDay === today) { await receipt(uid, { text: '✅ Already claimed today — see you tomorrow!' }); return cleanup(); }
    const streak = (d.lastDay === today - 1) ? (d.streak || 0) + 1 : 1;
    const bonus = Math.round(ECON.dailyFree * (1 + Math.min(streak, 10) * ECON.streakBonusPct / 100));
    await db().ref(wpath + '/daily').set({ lastDay: today, streak });
    await credit(uid, bonus);
    await receipt(uid, { text: `🪙 +${bonus} free coins! Streak day ${streak} 🔥`, daily: { lastClaim: Date.now(), streak } });
    return cleanup();
  }

  if (['photoBonus', 'video', 'profile'].includes(req.type)) {
    const amounts = { photoBonus: ECON.photoBonus, video: ECON.videoBonus, profile: ECON.profileBonus };
    const names = { photoBonus: '📸 photo quest', video: '📹 video reward', profile: '✨ profile complete' };
    const flagRef = db().ref(`${wpath}/flags/${req.type}`);
    if (req.type === 'video') {                                   // videos: once per day
      const today = Math.floor((Date.now() + 3600000) / 86400000);
      if ((await flagRef.get()).val() === today) { await receipt(uid, { text: 'Come back tomorrow for the next video 💛' }); return cleanup(); }
      await flagRef.set(today);
    } else {
      if ((await flagRef.get()).exists()) { await receipt(uid, { text: 'Already collected this one 💛' }); return cleanup(); }
      await flagRef.set(1);
    }
    await credit(uid, amounts[req.type]);
    await receipt(uid, { text: `🎁 +${amounts[req.type]} 🪙 — ${names[req.type]} complete!` });
    return cleanup();
  }

  if (req.type === 'rewind') {
    if (!(await tryDebit(uid, ECON.rewindCost))) await receipt(uid, { text: `↩️ Rewind needs ${ECON.rewindCost} 🪙` });
    return cleanup();
  }

  return cleanup();
});

/* =====================================================================
   🪙 REFEREE 3 — messages: 10 free, then 1🪙. Broke? Message vanishes.
   ===================================================================== */
exports.msgReferee = onValueCreated({ ref: `/${ROOT}/chats/{mid}/{msgId}`, ...TRIGGER }, async (event) => {
  const m = event.data.val();
  if (!m || !m.from || !m.text) return;               // skips system + gift bubbles
  const uid = m.from;
  const mid = event.params.mid;

  const res = await db().ref(`${ROOT}/chatCtl/${mid}/cnt_${uid}`).transaction((v) => (+v || 0) + 1);
  const cnt = +((res && res.snapshot && res.snapshot.val()) || 1);

  if (cnt <= ECON.freeChatMsgs) {
    await db().ref(`${ROOT}/chatMeta/${mid}/freeLeft`).set(ECON.freeChatMsgs - cnt);
    const other = (mid || '').split('_').find((x) => x && x !== uid);
    if (other) await notify(other, `💬 ${m.fromName || 'New message'}`, String(m.text).slice(0, 90));
    return;
  }

  await db().ref(`${ROOT}/chatMeta/${mid}/freeLeft`).set(0);
  if (!(await tryDebit(uid, ECON.msgCost))) {
    await event.data.ref.remove();                    // can't pay → the message never happened
    await db().ref(`${ROOT}/chats/${mid}`).push({ sys: 1, text: '🪙 Not enough coins — claim your free daily coins to keep the spark alive ✨', ts: Date.now() });
    await receipt(uid, { text: '🪙 Out of coins — daily coins are free, or ask for a gift 🌹' });
    return;
  }
  const other = (mid || '').split('_').find((x) => x && x !== uid);
  if (other) await notify(other, `💬 ${m.fromName || 'New message'}`, String(m.text).slice(0, 90));
});

/* =====================================================================
   🪙 REFEREE 4 — gifts: real vault-to-vault transfer or it never happened
   ===================================================================== */
exports.giftReferee = onValueCreated({ ref: `/${ROOT}/giftsFor/{uid}/{giftId}`, ...TRIGGER }, async (event) => {
  const g = event.data.val();
  if (!g) return;
  const to = event.params.uid;
  const from = g.from;
  const n = +g.coins || 0;
  if (!from || n <= 0) { await event.data.ref.remove(); return; }

  const mid = [from, to].sort().join('_');
  const chatRef = db().ref(`${ROOT}/chats/${mid}`);
  const findGiftBubble = async () => {
    const s = await chatRef.orderByChild('ts').limitToLast(10).get();
    let key = null;
    s.forEach((c) => { const v = c.val() || {}; if (v.gift === 1 && v.from === from && (+v.coins) === n) key = c.key; });
    return key;
  };

  if (!(await tryDebit(from, n))) {
    await event.data.ref.remove();                    // fake gift → erased
    const k = await findGiftBubble();
    if (k) await chatRef.child(k).remove();
    await chatRef.push({ sys: 1, text: '🪙 Gift couldn’t go through — not enough coins', ts: Date.now() });
    await receipt(from, { text: `🪙 You need ${n} 🪙 for that gift — grab coins first` });
    return;
  }

  await credit(to, n);                                 // REAL coins move vault → vault
  if (n >= ECON.giftExclusive) await db().ref(`${ROOT}/chatMeta/${mid}/exclusive`).set(1);
  await receipt(to, { text: `🌹 ${g.fromName || 'Someone'} gifted you ${n} 🪙 — high interest! 💛` });
  await receipt(from, { text: `🌹 ${n} 🪙 delivered — smooth.` });
  await notify(to, `🌹 ${n} coins gifted!`, `${g.fromName || 'Someone'} just proved real interest 💛`);
});

/* =====================================================================
   🪙 REFEREE 5 — super like: pays or politely downgrades to a like
   ===================================================================== */
exports.superReferee = onValueCreated({ ref: `/${ROOT}/incoming/{uid}/{from}`, ...TRIGGER }, async (event) => {
  const v = event.data.val();
  if (!v || v.d !== 'super') return;
  if (!(await tryDebit(event.params.from, ECON.superLikeCost))) {
    await event.data.ref.update({ d: 'like' });
    await receipt(event.params.from, { text: `✨ Super needs ${ECON.superLikeCost} 🪙 — sent as a normal like instead` });
  }
});

/* =====================================================================
   🪙 REFEREE 6 — boost: pays or gets cancelled
   ===================================================================== */
exports.boostReferee = onValueUpdated({ ref: `/${ROOT}/users/{uid}`, ...TRIGGER }, async (event) => {
  const before = event.data.before.val() || {};
  const after = event.data.after.val() || {};
  const newB = +after.boostUntil || 0;
  const oldB = +before.boostUntil || 0;
  if (!(newB > oldB && newB > Date.now())) return;     // not a fresh boost → ignore
  if (!(await tryDebit(event.params.uid, ECON.boostCost))) {
    await event.data.after.ref.child('boostUntil').set(0);
    await receipt(event.params.uid, { text: `🚀 Boost needs ${ECON.boostCost} 🪙` });
  }
});

/* =====================================================================
   🪙 REFEREE 7 — reveal: pays or the card re-blurs in their app
   ===================================================================== */
exports.revealReferee = onValueCreated({ ref: `/${ROOT}/reveals/{uid}/{peer}`, ...TRIGGER }, async (event) => {
  const uid = event.params.uid;
  if (!(await tryDebit(uid, ECON.revealLikeCost))) {
    await event.data.ref.remove();
    await receipt(uid, { text: `👀 Reveal needs ${ECON.revealLikeCost} 🪙`, undo: 'reveal', peer: event.params.peer });
  }
});

/* =====================================================================
   📲 PUSH — like alerts (kept standalone; msg/gift push now ride inside
   their referees so only REAL events ping phones)
   ===================================================================== */
exports.likePush = onValueCreated({ ref: `/${ROOT}/incoming/{uid}/{from}`, ...TRIGGER }, async (event) => {
  const v = event.data.val();
  if (!v || v.d === 'pass') return;
  const name = (await db().ref(ROOT + '/users/' + event.params.from + '/name').get()).val() || 'Someone';
  await notify(
    event.params.uid,
    v.d === 'super' ? '✨ SUPER like!' : '😍 New like on Zwin!',
    v.d === 'super'
      ? `${name} super-liked you — you clearly stand out 🔥`
      : `${name} likes you — open Zwin to see 💛`
  );
});

