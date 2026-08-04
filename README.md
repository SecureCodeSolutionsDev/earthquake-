# 🔥 Zwin — a Tinder-class dating app that dethrones Tinder

A complete dating platform — swipe, match, chat, **coin economy**, **coin gifting** —
engineered with dating psychology so users fall in love with the *app* while falling in love.
Runs on a **100% free cloud** — no server, no credit card.

| File | What it is | Who |
|---|---|---|
| `index.html` | The dating app (onboarding, deck, matches, chat, coins) | Your users |
| `admin.html` | Company dashboard (coin orders, users, moderation) | You |
| `zwin-config.js` | Firebase keys + company bank + coin economy | You edit once |

---

## 🧠 The psychology engineered inside (why users get hooked)

| Human truth | What Tinder does | What Zwin does |
|---|---|---|
| The "match spark" is sacred | Paywalls chat features around it | **First 10 messages FREE per match** — the first spark is never blocked. Paywall starts only *after* they're invested (sunk-cost + momentum) |
| Rejection hurts → users quit | Shown "you have 99+ likes" but paywalled hard | **Admirers show for free, super-likes always visible**, reveal costs little — curiosity loop without the pain |
| Men want to stand out | Only "Super Like" | **🌹 Coin gifting** — "buy her coins" = modern flowers. Socially it reads *high interest*, not desperation. ≥50 🪙 makes the chat **✨ EXCLUSIVE (gold)** |
| Women get flooded | Nothing | Exclusive gold chats rise visually in her list → she notices real intent |
| Variable reward = addiction | Random matches | Match-chance deck + "someone liked you" bursts + daily streak coins → **slot-machine dopamine, but warm** |
| Loss aversion = retention | — | **Daily free coins with streak bonus (+10%/day)** → users open the app *just to not break the streak* |
| Kindness = safety = women stay (the real growth engine) | Weak moderation | Report → admin one-tap ban, plus kind-design prompts everywhere |
| Investment principle | — | Every coin gifted/earned = sunk cost that keeps them. Every streak = commitment |

## 💰 The coin economy (how you make money)

```
FREE INFLOW (habit)                SPEND SINKS (revenue back to you)
┌───────────────┐                  ┌──────────────────────────────┐
│ Welcome +50 🪙│──┐               │ 💬 1 🪙/msg (after 10 free)  │
│ Daily +10🪙↗   │  │   users 🪙   │ ✨ Super like   5 🪙          │
│ Streak bonus  │──┼──────────────►│ 🌹 Gift         10–100 🪙     │
│ Invites, video│──┘               │ 👀 Reveal      20 🪙          │
└───────────────┘                  │ 🚀 Boost       15 🪙          │
                                   │ ↩️ Rewind       3 🪙          │
ONLY **you** create new coins      └──────────────────────────────┘
(by selling packs)                 Gifts just recirculate coins —
60DH→120🪙 120→300🪙 250→700🪙    pack sales = your only revenue.
```

**Why gifts don't lose you money:** coins only enter the system when YOU sell a pack.
A gift moves existing coins around, creates social obligation to reply/spend more,
and the recirculation burns balances faster → more pack purchases. 🌹 = pure profit leverage.

## ✅ Setup (5 minutes, free forever)

1. **Firebase** (free Spark, no card): https://console.firebase.google.com
   → Add project → **Build → Realtime Database** → create (location `europe-west1`, **test mode**)
   → ⚙️ Project settings → Web app `</>` → copy 5 keys
2. Paste them into **`zwin-config.js`** (replace `PASTE_...`)
3. Edit **company bank** details in the same file (currently random demo data!)
4. Set your **adminPin**
5. Host free: drag folder to **app.netlify.com/drop** OR GitHub Pages OR Firebase Hosting

Done. Share `index.html` link with users. `admin.html` is yours (PIN-gated).

## ⚡ "Powerful for millions of users" — the free workaround explained

| Scale | Cost | How |
|---|---|---|
| 0 – 50k monthly users | **$0** | Firebase Spark (1 GB DB, 10 GB/mo) + Netlify/Pages free hosting — **current setup** (cache = 2-min discover cache keeps reads tiny) |
| 50k – 500k users | ~$0–25/mo | Same code. Firebase **Blaze pay-as-you-go** still has a free tier; you pay cents/GB beyond. Add: profile photos as compressed WebP, DB sharding by city (`zwin/casa/...`) — this is one config line change (see below) |
| 500k – 5M+ users | Managed cost | Same code, swap `ref()` root per region (multi-project), Cloud CDN caching, batch chat writes. The app is already stateless — it scales horizontally by design |

**Built-in scalability in this codebase (already done for you):**
- Discover pool cached 2 minutes client-side → 1 DB read per 2 min per user, not per swipe
- Chat listens limited to last 30 messages
- Presence uses heartbeat + onDisconnect (no polling)
- All money moves via atomic `transaction()` (safe under concurrency)
- City sharding ready: change one string `wasla_dating` → `wasla_dating_casa` to shard

## 🖥 Admin panel (`admin.html`, PIN-gated)

- 📊 KPIs: users, online now, matches, messages, coins gifted, revenue
- 🪙 **Coin orders**: users pay by bank transfer to your RIB → you tap **✓ Credit coins** → coins land in their app instantly
- 🛡️ **Reports**: one-tap **Ban** (removes profile) or Dismiss
- 👥 User list with balances
- ⚙️ Bank details + full economy reference

## 🔒 Before real launch

1. Change `adminPin` in `zwin-config.js`
2. 🔐 **All 3 security locks are now built-in** — phone sign-in (SMS, like WhatsApp),
   rules keyed to `auth.uid`, and App Check against bots. Enable them with the
   console steps in **SECURITY-LOCKS.md**; paste the locked rules from
   **`firebase-rules.json`**. Until then the app runs open (beta).

3. Photos 📸 and push 📲 are built in (v2.0) — free Firebase storage by default
   (Cloudinary free tier is the scale path), and lock-screen alerts need one
   Web Push key + optional `functions/` deploy → **PHOTOS-PUSH-GUIDE.md**.
4. Moroccan law note: dating apps are fine; keep moderate content rules + 18+ gate (already built in).

## 🎨 Design language

Sunset-warm gradient (#ff4e7e → #ff8a5c, shades of a Casablanca sunset at Ain Diab 🌅),
supersized rounded cards, stamps (LIKE / NOPE / WOW ✨), confetti match celebration
with both avatars, gold exclusive chats, streak fire — every micro-detail says
*warm, safe, playful, hopeful*. Not a hookup app. A **heart** app. 💛

## 🗺 Roadmap (already architected — ask me to build any)

1. ~~Real photos~~ ✅ **DONE (v2.0)** — auto-compress, deck/likes/chat/match views — PHOTOS-PUSH-GUIDE.md
2. ~~Push notifications~~ ✅ **DONE (v2.0)** — toasts + lock-screen alerts + optional auto-push (`functions/`)
3. Selfie-verified badge (badge slot already reserved in profile)
4. CMI/Stripe in-app payments → auto-credit coins without admin validation
5. Video profiles / voice intros (biggest Gen-Z pull)
6. "Double date" mode, events in Casablanca
7. Arabic/French language toggle (infrastructure exists — ask me)

---

💛 *Zwin* (Darija: beautiful/handsome). Dating, but warmer. Built for Morocco, ready for the world.
