/* =====================================================================
   ZWIN 🔥 — OPTIONAL automatic push sender (Cloud Functions)
   ---------------------------------------------------------------------
   What it does: the second someone likes / messages / gifts coins,
   the other phone gets a lock-screen notification. Automatically.

   Cost truth: needs the Blaze (pay-as-you-go) plan = a card on file.
   The free allowance covers ~2 MILLION runs/month, so at your early
   scale the invoice stays 0.00 MAD. Until you enable it, everything
   still works — send pushes manually from Firebase console → Messaging.

   Deploy steps: see PHOTOS-PUSH-GUIDE.md (Level 3).
   ===================================================================== */

const { onValueCreated } = require('firebase-functions/v2/database');
const { initializeApp } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');
const { getMessaging } = require('firebase-admin/messaging');

initializeApp();

const ROOT = 'wasla_dating';               // 🔒 same root chosen for your rules
const TRIGGER = {
  region: 'europe-west1',                  // your Realtime DB location
  instance: 'PASTE_PROJECT-default-rtdb'   // ← replace PASTE_PROJECT with your project id
};

const db = () => getDatabase();

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

/* 💘 Someone liked me */
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

/* 🌹 Someone gifted me coins */
exports.giftPush = onValueCreated({ ref: `/${ROOT}/giftsFor/{uid}/{giftId}`, ...TRIGGER }, async (event) => {
  const g = event.data.val();
  if (!g) return;
  await notify(
    event.params.uid,
    `🌹 ${g.coins} coins gifted!`,
    `${g.fromName || 'Someone'} just proved real interest 💛`
  );
});

/* 💬 New chat message → ping the other person in the match */
exports.msgPush = onValueCreated({ ref: `/${ROOT}/chats/{mid}/{msgId}`, ...TRIGGER }, async (event) => {
  const m = event.data.val();
  if (!m || !m.from || !m.text) return;              // skips system + gift bubbles
  const other = (event.params.mid || '').split('_').find((x) => x && x !== m.from);
  if (!other) return;
  await notify(other, `💬 ${m.fromName || 'New message'}`, String(m.text).slice(0, 90));
});
