# 🔐 Security Locks — activation guide (10 minutes, all FREE)

Your app code now has all 3 locks built in. Turn each one ON in the Firebase console.
Do them **in this order** — users can't sign in until step 1 is done.

---

## 🔒 LOCK 1 — Google sign-in (who is who)

1. Firebase console → **Build → Authentication → Get started**
2. **Sign-in method** tab → click **Google** → **Enable** → Save
   (the Google provider needs NO keys — one toggle and it's live)
3. **Settings** tab → **Authorized domains** → **Add domain** → paste:
   `YOUR-USERNAME.github.io`  ← your GitHub Pages domain (no https://, no /zwin)
4. Done. Every user gets a verified `auth.uid` from their Google account —
   one tap, no SMS costs, no monthly limits, works in every country.

---

## 🔒 LOCK 2 — Rules keyed to auth.uid (your data, your rules)

1. Firebase console → **Realtime Database → Rules tab**
2. **Delete everything** in the editor
3. Open **`firebase-rules.json`** from this project → copy ALL of it → paste → **Publish**

What the rules now guarantee:

| Rule | Meaning |
|---|---|
| `auth.uid === $uid` on swipes/wallet | Layla can **never** touch Omar's coins, swipes, or matches |
| `auth.uid === $from` on likes | Nobody can fake "Sarah liked you" |
| `$mid.contains(auth.uid)` on chats | Only the 2 people in a match can read/write their chat |
| `admins/` node | **Only you** can credit coin orders, ban users, read reports |
| `reports write: auth != null` | Any signed-in user can report, only admin reads |

---

## 👑 Make YOURSELF the admin (one-time, 2 minutes)

The rules check an `admins` list inside the database that only you can edit from the console:

1. Open your dashboard **`admin.html`** → PIN → sign in with YOUR Google account (the owner's)
2. Firebase console → **Authentication → Users** → find your Google user → **copy the UID**
   _(it's like `xK9mPq3nVzL...`)_
3. Firebase console → **Realtime Database → Data tab** → click **`wasla_dating`** → **+** add:
   - key: `admins`  → inside it, **+** add:
     - key: `<paste your UID>`  →  value: `true`
4. Now `admin.html` can approve orders, ban abusers, see reports. No one else can — ever.

> 🔐 Google sign-in only proves ID. The `admins` node is what makes YOU the owner.
> Attackers can sign in as users, but they can't get into that list — only console (your Google account) writes it.

---

## 🔒 LOCK 3 — App Check (bots locked out) — optional but do it before marketing

1. Firebase console → **Build → App Check**
2. Select your web app → **Register** with **reCAPTCHA v3**
   (creates a Google Cloud reCAPTCHA pair — the console guides you, it's free)
3. Copy the **Site Key** → paste into `zwin-config.js`:
   ```js
   appCheck: { recaptchaSiteKey: "6Lf..." }
   ```
4. Back in App Check → enforce it on **Realtime Database**
   ( there's an "Enforce" toggle per product — flip it)

Now every request must prove it comes from YOUR real app on YOUR real domain.
Scripts and bots get dropped before they even read the rules.

---

## ✅ Verify the locks (2 minutes)

| Test | Expected |
|---|---|
| Open the app → you get a "Continue with Google" screen | ✅ Lock 1 works |
| After picking your account → deck loads | ✅ auth passed |
| In console Data tab, try reading from an *incognito* browser | "Permission denied" until verified |
| Publish rules → old `now < …` expiry gone | ✅ no Sept-time bomb |
| App Check enforced + key pasted → app still works | ✅ Lock 3 works |
| Wrong device tries to credit itself coins (`users/{otherUid}`) | Rule says **NO** 🚫 |

## ⚠️ Notes

- The old 30-day test-mode rules (`now < 1788...`) are REPLACED by `firebase-rules.json` — publish it, no more countdown.
- GitHub Pages domain must match exactly what you paste in Authorized domains.
- Google sign-in is FREE and unlimited — no SMS quota to ever think about.
- If a user quits and you must remove them: **Authentication → Users → delete** (+ optional `banned/{uid}: true` flag via admin).
