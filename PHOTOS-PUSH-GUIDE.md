# 📸📲 Photos + Push — setup guide (Melt v2.0)

What's new in this version, and the few console clicks each part needs.

| Upgrade | Where users see it | Console work needed |
|---|---|---|
| 📸 **Real photos** | Swipe cards, match celebration, Liked-You grid, chat header, profile (up to 4, first = main) | **NONE — works now** ✅ |
| 📲 **In-app toasts** | "😍 Salma likes you!" while app is open | **NONE — works now** ✅ |
| 🔔 **Lock-screen push** | Lock screen when app is closed | 1 key paste (Step A below) |
| ⚡ **Auto push per event** | "💬 Imane: salam👋" the second it happens | Optional Level 3 (Blaze, ~$0) |

---

## 📸 PHOTOS — zero setup (already live)

- Users: **Me tab → My photos → ＋** → pick from gallery → auto-compressed to ~640px (~40–80KB) → synced to Firebase → instantly on their card.
- **+25 🪙 quest** rewards the first photo (hook: profiles with photos match ~3× more).
- New device? Photos auto-restore from the cloud on login.
- Stored in `wasla_dating/photos/{uid}/p0..p3` — kept in a **separate table** so discover never downloads heavy data (bandwidth stays tiny = the free plan lasts).

### 🛡️ Photo moderation (30 seconds when needed)
Firebase console → Realtime Database → **Data** → `wasla_dating → photos → <the-user-uid>` → hover a `p0/p1..` → ✕ delete. The report button in the app already flags abusers in `reports` (admin dashboard → one-tap **Ban**).

### 📈 Scaling past ~10k photo profiles (optional)
Free Firebase holds ~1GB (≈ 2,000–4,000 full 4-photo profiles). When you outgrow it — **Cloudinary free tier (25GB, no card)**:
1. https://cloudinary.com → free sign up
2. Settings → Upload → **Upload presets → Add** → set **Signing Mode: Unsigned** → Save (name it `zwin`)
3. In `zwin-config.js` fill: `photos.cloudinary: { cloudName: "YOURS", uploadPreset: "zwin" }` → re-upload to GitHub
The code auto-switches — photos then live on Cloudinary's CDN (faster worldwide), Firebase stays tiny.

---

## 🔔 PUSH — Step A: the VAPID key (5 minutes, FREE)

1. Firebase console → ⚙️ **Project settings → Cloud Messaging** tab
2. Scroll to **Web Push certificates** → **Generate key pair**
3. Copy the long key (starts like `BKx...`) → paste in `zwin-config.js`:
   `fcm: { vapidKey: "BKx..." }`
4. Re-upload `zwin-config.js` to GitHub → done.

**Test it:** on your phone → Me tab → **📲 Lock-screen alerts → Turn on** → allow. Then Firebase console → **Run → Messaging → New notification** → write "💘 Someone likes you!" → target your web app → **Publish**. Lock screen lights up. 🎉

> Use the composer for free **promo blasts** forever ("Weekend in Casa? 2× coins tonight 🔥").

### ⚡ Auto push per like/message/gift — Level 3 (optional)
Included ready-made in **`functions/`**. Needs the Blaze plan (a card, but the free
allowance = ~2M runs/month → **invoice stays ~0 DH** at your scale):
1. Firebase console → Upgrade → **Blaze** (set a budget alert: 10 DH for peace of mind)
2. In `functions/index.js` replace `PASTE_PROJECT` with your project id (2 spots)
3. On any computer: install Node.js → `npm install -g firebase-tools`
4. `firebase login` → `firebase use YOUR_PROJECT_ID`
5. From the zwin folder: `firebase deploy --only functions` ✅

### 📱 iPhone note
iPhones deliver web push **only when the app is on the Home Screen**: Safari → Share → **Add to Home Screen** (the included `manifest.json` + `icon.png` make it a real app icon 🔥). Android & desktop browsers work directly.

---

### 💰 Honest cost summary
| Piece | bill |
|---|---|
| Photo upload + sync (Firebase) | **0 DH** (≈ 2–4k full profiles, then Cloudinary free) |
| In-app + lock-screen push (Spark) | **0 DH** — FCM has no quota |
| Console promo broadcasts | **0 DH** |
| Auto push (Blaze, optional) | **0 DH** inside free allowance, realistic first year |

---

## 🪙 LOCK COINS — the server referee (kills the LAST possible hack)

**The vault principle:** coins live in `wallets/{uid}` — a node users can READ
but can NEVER WRITE. Cloud Functions are the only banker: every daily claim,
gift, message, boost, super-like, reveal and welcome bonus is validated
server-side. A cheater editing app files now only repaints their own wallpaper. 💪

| Attack | After the referee |
|---|---|
| Edit local coins / DevTools inflate | ❌ Screen reverts to vault value; spends fail server-side |
| Fake a 100🪙 gift while broke | ❌ Gift + chat bubble deleted, zero coins move |
| Free messages beyond the 10 free | ❌ Message deleted + kind "get coins" note |
| Super-like / Boost / Reveal at 0 🪙 | ❌ Downgraded · cancelled · card re-blurs |
| Daily-claim farming | ❌ Server tracks days + one-time quest flags |
| Claim a quest twice | ❌ Server flag says "already collected" |

### Activate (15 min — needs the Blaze plan from Level 3)
**ORDER MATTERS — functions first, rules second:**
1. ✅ Deploy functions (Level 3 steps above) — the referee is already inside
   `functions/index.js` (`welcomeCoins`, `coinRequests`, `msgReferee`,
   `giftReferee`, `superReferee`, `boostReferee`, `revealReferee`)
2. THEN → Realtime Database → Rules → paste the NEW `firebase-rules.json` → **Publish**
3. Re-upload the new `index.html` + `admin.html` to GitHub
4. Test: claim daily coins → "⏳ The vault is checking…" → vault receipt toast →
   balance rises. Try editing localStorage → the vault slaps it back. 😌

> 💰 Your revenue never depended on client honesty anyway: only YOU credit pack
> orders (admin dashboard → now writes into the vault). The referee simply makes
> the free side farm-proof too.
>
> 🔁 Beta balances: old `users/{uid}/coins` values become display history —
> everyone gets a fresh 50🪙 welcome in the vault; you can top anyone up manually
> from the admin dashboard anytime.
