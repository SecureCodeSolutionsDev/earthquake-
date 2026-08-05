/* =====================================================================
   MELT — GLOBAL CONFIG (edit here — shared by all apps)
   Used by: index.html (dating app) · admin.html (company dashboard)
   Keys are pre-filled for project zwin-270c4 (DB instance name in Firebase
   keeps this id; the BRAND is Melt everywhere users look).
   ===================================================================== */
const ZWIN_CONFIG = {

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

  /* ---------- PUSH (FCM VAPID key — active once the referee ships) ---------- */
  fcm: {
    vapidKey: "BGcLqf4irpZLSsHzAu76-5uU2U8seU3zWcv5bOE0c8i5mvBlCjm5qx2Bzq8rcmpv9xcMOuwbcTMxda2XbxiMoIc"
  },

  /* ---------- PRO MEDIA (art packs load first; these are only overrides) */
  media: {
    base: "img/",
    authBg:"", flame:"", like:"", nope:"", super:"", rewind:"", boost:"",
    coin:"", gift:"", send:"", loveface:"", chat:""
  },

  /* ---------- 2. COMPANY BANK (RANDOM DEMO DATA — edit before real launch) */
  company: {
    name:        "Melt Dating SARL",
    accountName: "MELT DATING SARL AU",
    bank:        "CIH Bank — Agence Mohammed V, Casablanca",
    rib:         "230 780 0000192900511477 52",
    iban:        "MA52 2307 8000 0019 2900 5114 7752",
    swift:       "CEMAMAMC",
    ice:         "001746559000091",
    supportEmail:"love@melt.ma",
    supportPhone:"+212 6 62 00 00 00"
  },

  /* ---------- 3. MELT GOLD — one-time pass, unlimited forever (no coins)
     Free users: capped daily so they feel the wall and convert; counters reset
     after midnight so they always come back. GOLD: flip in admin after the
     bank transfer lands. Tune freely — admin Settings shows these live.    */
  gold: {
    priceDH:      99,   // one-time. Never a subscription.
    likesPerDay:  20,   // free likes every day, reset after midnight
    msgsPerMatch: 10,   // free messages per new match (the spark stays free)
    superPerDay:   1,   // free Super Likes per day
    superGold:     5    // Super Likes per day for GOLD members
  },

  /* ---------- 4. ADMIN PIN for admin.html ---------- */
  adminPin: "VidaAdmin123###_",

  appName: "Melt",
  tagline: "Love that melts doubts away."
};
function zwinCloudReady(){ return !ZWIN_CONFIG.firebase.apiKey.startsWith("PASTE"); }
