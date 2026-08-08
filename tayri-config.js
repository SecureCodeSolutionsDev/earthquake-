/* =====================================================================
   TAYRIPAGES — GLOBAL CONFIG (edit here — shared by all apps)
   Used by: index.html (dating app) · admin.html (company dashboard)
   Keys are pre-filled for project zwin-270c4 (DB instance name in Firebase
   keeps this id; the BRAND is Tayripages everywhere users look).
   ===================================================================== */
const TAYRI_CONFIG = {

  /* ---------- PUBLIC SITE (Cloudflare Pages) ---------- */
  site: {
    url: "https://securecodesolutionsdev.github.io/earthquake-/",
    authorizedDomain: "securecodesolutionsdev.github.io"
  },

  /* ---------- 1. CLOUD (Firebase) ---------- */
  firebase: {
    apiKey:      "AIzaSyCefjPeoakEOUg9mjI_lLwU80dka0lNkEc",
    authDomain:  "zwin-270c4.firebaseapp.com",
    databaseURL: "https://zwin-270c4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId:   "zwin-270c4",
    appId:       "1:231744808339:web:a6be044023f256f9c93466"
  },

  /* ---------- App Check (reCAPTCHA v3 SITE key) ---------- */
  appCheck: {
    recaptchaSiteKey: "6LfF73QtAAAAAAS5_QpF8M15_5ohqA3B8XA4IfDq"
  },

  /* ---------- REAL PHOTOS ---------- */
  photos: {
    maxPhotos:  4,
    maxSize:    640,
    quality:    0.75,
    cloudinary: { cloudName: "", uploadPreset: "" }   // optional scale path
  },

  /* ---------- PUSH (optional; not required for instant video) ---------- */
  fcm: {
    vapidKey: "BGcLqf4irpZLSsHzAu76-5uU2U8seU3zWcv5bOE0c8i5mvBlCjm5qx2Bzq8rcmpv9xcMOuwbcTMxda2XbxiMoIc"
  },

  /* ---------- FREE PEER-TO-PEER VIDEO ---------- */
  video: {
    enabled: true,
    rtc: {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" }
      ]
    },
    /* 🔌 FREE TURN relay (recommended for revenue — saves calls on restrictive
       routers / 4G. Both cost $0 to start:
       · Cloudflare Calls → 1 TB egress/month free, no card (dash.cloudflare.com → Calls → App Secret)
       · metered.ca → 50 GB/month free (dashboard → API → TURN credentials)
       Paste the ONE credential set they give you below. While it says PASTE_,
       Tayripages uses the free STUN path exactly as before — nothing breaks. */
    turn: {
      urls: "turn:global.relay.metered.ca:80?transport=tcp",
      username: "PASTE_TURN_USERNAME",
      credential: "PASTE_TURN_CREDENTIAL"
    }
  },

  /* ---------- PRO MEDIA (art packs load first; these are only overrides) */
  media: {
    base: "img/",
    authBg:"", flame:"", like:"", nope:"", super:"", rewind:"", boost:"",
    coin:"", gift:"", send:"", loveface:"", chat:""
  },

  /* ---------- 2. COMPANY BANK (RANDOM DEMO DATA — edit before real launch) */
  company: {
    name:        "Tayripages",
    accountName: "TAYRIPAGES DATING SARL AU",
    bank:        "CIH Bank — Agence Mohammed V, Casablanca",
    rib:         "230 780 0000192900511477 52",
    iban:        "MA52 2307 8000 0019 2900 5114 7752",
    swift:       "CEMAMAMC",
    ice:         "001746559000091",
    supportEmail:"support@securecodesolutionsdev.github.io",
    supportPhone:"+212 6 62 00 00 00"
  },

  /* ---------- 3. TAYRIPAGES GOLD — one-time pass, unlimited forever (no coins)
     Free users: capped daily so they feel the wall and convert; counters reset
     after midnight so they always come back. GOLD: flip in admin after the
     bank transfer lands. Tune freely — admin Settings shows these live.    */
  gold: {
    priceDH:      99,   // one-time. Never a subscription.
    usd:           9,   // shown next to the DH price (≈ rate hint for the diaspora)
    likesPerDay:  30,   // free likes every day, reset after midnight
    msgsPerMatch: 10,   // free messages per new match (the spark stays free)
    superPerDay:   1,   // free Super Likes per day
    superGold:     5    // Super Likes per day for GOLD members
  },

  /* ---------- 4. ADMIN PIN for admin.html (client-side convenience only) ---------- */
  adminPin: "CHANGE_ME_BEFORE_DEPLOY",

  appName: "Tayripages",
  tagline: "Tayri — the Tamazight word for love. Where real connections begin."
};
function tayriCloudReady(){ return !TAYRI_CONFIG.firebase.apiKey.startsWith("PASTE"); }
