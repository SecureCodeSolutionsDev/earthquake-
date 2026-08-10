/**
 * TAYRIPAGES — Scam / Catfish / Asking for Money — Top 100 phrases
 * Dating scams: money requests, visa, military, oil rig, gift cards, crypto.
 * Languages: EN, FR, ES, PT, RU, ZH, AR-Darija, AR-EG
 * Use to flag bios, first messages, and after-match chats before GOLD.
 */
export const SCAM_100 = {
  en: [
    "send me money","send money","need money","i need money for visa","my mother is sick send money",
    "my father in hospital","pay my ticket","western union","moneygram","gift card","steam card","itunes card",
    "bitcoin","crypto","usdt","help me pay","stranded at airport","oil rig","military base","deployed soldier",
    "i love you send","my queen send","my king send","vidéo sexy payante","i am a model pay","verify by paying"
  ],
  fr: [
    "envoie moi de l'argent","envoie de l'argent","j'ai besoin d'argent pour visa","ma mère est malade envoie",
    "mon père à l'hôpital","paye mon billet","western union","carte cadeau","bitcoin","aide moi à payer",
    "bloqué à l'aéroport","plateforme pétrolière","militaire","je t'aime envoie"
  ],
  es: [
    "envíame dinero","necesito dinero para visa","mi madre está enferma envía","mi padre en el hospital",
    "paga mi boleto","western union","tarjeta de regalo","bitcoin","bloqueado en aeropuerto","plataforma petrolera","soldado"
  ],
  pt: [
    "me envie dinheiro","preciso de dinheiro para visto","minha mãe está doente envie","meu pai no hospital",
    "pague minha passagem","western union","cartão presente","bitcoin","preso no aeroporto"
  ],
  ru: [
    "пришли мне деньги","prishli mne dengi","нужны деньги на визу","мама больна пришли","заблокирован в аэропорту"
  ],
  zh: [
    "给我打钱","需要签证钱","我妈妈生病了打钱","给我买机票","西联汇款","礼品卡","比特币","被困在机场"
  ],
  ar_darija: [
    "sift liya flous","sift flous","mahtaj flous visa","mmi mrida sift flous","bba f sbitar","khelles liya ticket","western union","wafacash","carte recharge","bitcoin","hasel f matar","platora petrol","askari"
  ],
  ar_egypt: [
    "eb3atli flous","mehtag flous visa","ommi 3ayana eb3at","aboya fel mostashfa","edfa3 tazartek","western union","vodafone cash","etisalat cash","bitcoin","3aleq fel matar","zabet"
  ]
};

export const SCAM_FLAT = Object.values(SCAM_100).flat().map(s=>s.toLowerCase());

export function containsScam(text){
  if(!text) return null;
  const t = text.toLowerCase();
  for(const p of SCAM_FLAT){
    if(t.includes(p)) return p;
  }
  return null;
}
