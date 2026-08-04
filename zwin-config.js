/* =====================================================================
   ZWIN 🔥 — GLOBAL CONFIG (🔧 edit here — shared by all apps)
   Used by: index.html (dating app) · admin.html (company dashboard)
   ===================================================================== */
const ZWIN_CONFIG = {

  /* ---------- 1. FREE CLOUD (Firebase Spark = $0, no card — see README.md)
     console.firebase.google.com → project → Realtime Database (europe-west1,
     test mode) → Project settings → Web app </> → paste the 5 keys below.   */
  firebase: {
    apiKey:      "AIzaSyCefjPeoakEOUg9mjI_lLwU80dka0lNkEc",
    authDomain:  "zwin-270c4.firebaseapp.com",
    databaseURL: "https://zwin-270c4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId:   "zwin-270c4",
    appId:       "1:231744808339:web:a6be044023f256f9c93466"
  },

  /* ---------- 2. COMPANY BANK (⚠️ RANDOM DEMO DATA — EDIT BEFORE LAUNCH)
     Shown to users when they buy coin packs by bank transfer.              */
  company: {
    name:        "Zwin Dating SARL",
    accountName: "ZWIN DATING SARL AU",
    bank:        "CIH Bank — Agence Mohammed V, Casablanca",
    rib:         "230 780 0000192900511477 52",   // 24-digit RIB (random)
    iban:        "MA52 2307 8000 0019 2900 5114 7752",
    swift:       "CEMAMAMC",
    ice:         "001746559000091",
    supportEmail:"love@zwin.ma",
    supportPhone:"+212 6 62 00 00 00"
  },

  /* ---------- 3. COIN ECONOMY (🪙 tune freely — live-balanced in admin) --- */
  coins: {
    welcomeBonus:  50,    // new users start rich → great first session
    dailyFree:     10,    // claim every day (streak habit loop)
    streakBonusPct:10,    // +10%/day of consecutive claims, caps at 2×
    freeChatMsgs:  10,    // every new match starts with 10 FREE messages
    msgCost:        1,    // 🪙 per message after free ones are used
    superLikeCost:  5,    // "Wow ✨" — guarantees she sees you first
    giftExclusive: 50,    // gifting ≥ this turns the chat EXCLUSIVE (gold)
    revealLikeCost:20,    // unblur one "Liked You" card
    boostCost:     15,    // 30 min top-of-stack in your city
    rewindCost:     3,    // undo last swipe (regret = purchasable emotion)
  },

  /* ---------- 4. COIN SHOP PACKS (real money → bank transfer → validate) - */
  packs: [
    { id:"p1", coins:120, priceDH: 60, label:"Starter",  em:"🌱" },
    { id:"p2", coins:300, priceDH:120, label:"Popular",  em:"💘", tag:"BEST VALUE" },
    { id:"p3", coins:700, priceDH:250, label:"Casanova", em:"👑" }
  ],

  /* ---------- 5. ADMIN PIN for admin.html (change it!) ---------- */
  adminPin: "1234",

  appName: "Zwin",
  tagline: "Dating, but warmer."
};
function zwinCloudReady(){ return !ZWIN_CONFIG.firebase.apiKey.startsWith("PASTE"); }
