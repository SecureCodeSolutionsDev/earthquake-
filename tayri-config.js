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
    recaptchaSiteKey: ""  // App Check OFF — bots are stopped by Google sign-in + database rules + daily caps. Paste a key here to re-enable later.
  },

  /* ---------- REAL PHOTOS ---------- */
  photos: {
    maxPhotos:  5,      // up to 5 photos per profile — swiper browses them all
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
    /* 🔌 FREE TURN relay stack — set once, forget forever:
       1) metered.ca account credentials below → 500 MB/month, AUTO-RENEWING (you never touch it)
       2) Open Relay (public metered community relay) → no account, no expiry, unlimited-ish —
          automatic backup when quota runs out. WebRTC picks the fastest that answers.
       (Cloudflare 1 TB needs short-lived keys + a backend, so it waits for the first GOLD income.) */
    turn: {
      urls: [
        "turn:global.relay.metered.ca:80",
        "turn:global.relay.metered.ca:80?transport=tcp",
        "turn:global.relay.metered.ca:443",
        "turn:global.relay.metered.ca:443s?transport=tcp"
      ],
      username: "efc38c840c1c62b58e8f1d3f",
      credential: "EqJsIb4KUD3EbYNL"
    },
    turns: [
      { urls: [
          "turn:global.relay.metered.ca:80",
          "turn:global.relay.metered.ca:80?transport=tcp",
          "turn:global.relay.metered.ca:443",
          "turn:global.relay.metered.ca:443s?transport=tcp"
        ],
        username: "efc38c840c1c62b58e8f1d3f",
        credential: "EqJsIb4KUD3EbYNL" },
      { urls: [
          "turn:openrelay.metered.ca:80",
          "turn:openrelay.metered.ca:443",
          "turn:openrelay.metered.ca:443?transport=tcp"
        ],
        username: "openrelayproject",
        credential: "openrelayproject" }
    ]
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
  /* Public prices are USD only. Internal MAD stays in RTDB config/* for the bank. */
  fame: null,

  gold: {
    priceDH:      199,  // internal bank amount — never shown
    usd:           20,  // public GOLD price (199 MAD ≈ $20)
    likesPerDay:  50,   // free likes every day, reset after midnight — bulk audit final: 50 (was 30, 100 was too much)
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
