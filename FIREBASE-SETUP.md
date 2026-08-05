# 🔥 Firebase Setup — 5 minutes to go live (FREE)

## 1. Create the project (2 min)
1. Open **https://console.firebase.google.com** → sign in with any Google account
2. Click **"Add project"** → name: `zwin` → **disable "Enable Google Analytics"** → Create project → Continue

## 2. Create the database (2 min)
1. Left menu: **Build → Realtime Database** → **Create database**
2. Location: **`europe-west1`** (Belgium — fastest for Morocco) → Next
3. Choose **"Start in test mode"** → Enable
4. ⚠️ **Copy your database URL** shown at the top — it looks like:
   `https://zwin-abc123-default-rtdb.europe-west1.firebasedatabase.app`
   (Yours will be different — the region matters!)

## 3. Get your web keys (1 min)
1. Click **⚙️ → Project settings**
2. Scroll to **"Your apps"** → click the **Web icon `</>`**
3. Nickname: `zwin web` → (skip hosting checkbox) → **Register app**
4. You'll see a code block like:

```js
const firebaseConfig = {
  apiKey: "AIzaSyC4k...",            // ← copy
  authDomain: "zwin-abc123.firebaseapp.com",
  databaseURL: "https://zwin-abc123-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "zwin-abc123",
  appId: "1:1234567890:web:abcd1234..."
};
```

## 4. Paste into your repo
On GitHub: open **`zwin-config.js`** → ✏️ Edit → replace the 5 `PASTE_...` values:

```js
firebase: {
  apiKey:      "AIzaSyC4k...",       // from step 3
  authDomain:  "zwin-abc123.firebaseapp.com",
  databaseURL: "https://zwin-abc123-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:   "zwin-abc123",
  appId:       "1:1234567890:web:abcd1234..."
},
```

Also while you're here: change **`adminPin`** from `1234` to your secret PIN,
and update the **company bank RIB/IBAN** with your real details → **Commit changes**.

GitHub Pages rebuilds automatically (~1 min) → your site is LIVE ✅

## 5. Set safe database rules (important!)

Test mode rules **expire after 30 days**. Replace them now so the app never breaks:

Firebase console → Realtime Database → **Rules** tab → paste the locked rules
from **`firebase-rules.json`** (included in this repo) → **Publish**.
Those rules require a Google sign-in (one tap) — see **SECURITY-LOCKS.md** for the 3-lock
activation guide (auth + per-user rules + App Check).

## ✅ Test your live system (needs 2 devices/browsers)

1. Phone A: open `https://YOUR-NAME.github.io/zwin/` → create profile **Layla** (woman)
2. Phone B (or laptop): open it → create profile **Omar** (man, into women)
3. Omar swipes → finds Layla's card → Like ♥
4. Layla's phone: **"😍 Someone likes you!"** appears instantly
5. Layla likes back → **IT'S A MATCH + confetti** on BOTH phones 🎉
6. Chat live: messages arrive in real time; free counter drains 10→0, then coins
7. 🌹 Gift 50 coins → chat turns **GOLD EXCLUSIVE** on both screens
8. Layla buys the 60 DH pack → **`admin.html`** (your PIN) shows the order →
   tap **✓ Credit coins** → coins land in her app instantly
9. Watch **Zwin HQ** KPIs: 2 users · 1 match · messages flowing 📊

If all that works — **you own a live dating platform.** 🚀

## 🆘 Common fixes

| Problem | Fix |
|---|---|
| "DEMO MODE" banner still shows | `apiKey` still starts with `PASTE` — re-edited & committed? Wait 60s for Pages rebuild |
| No one appears in the deck | Other profiles must exist (create a 2nd account on another device) — and check gender preferences match |
| Permission denied in console | Rules expired → paste the rules above → Publish |
| Wrong databaseURL | Must be the one from YOUR project — region part differs by choice |
| Coins didn't arrive | Admin → Coin orders → the order is pending → tap ✓ |

Need me next: real photos, push notifications, CMI/Stripe auto-payments, FR/AR toggle — just say the word 💛
