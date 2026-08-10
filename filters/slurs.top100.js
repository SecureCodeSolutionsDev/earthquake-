/**
 * TAYRIPAGES — Slurs Filter — Top slurs for moderation (separate file)
 * PURPOSE: automated filtering only. Do NOT display these words to users.
 * List is for detection — block or flag message, show generic "inappropriate language" warning.
 * Languages: EN, FR, ES, PT, RU, ZH, AR (Darija + EG)
 * Notes: kept to ~70 most globally reported slurs in dating context (race, religion, orientation, disability, gender).
 * For Darija/Egyptian, includes transliteration + Arabic script.
 */
export const SLURS_100 = {
  en: [
    "nigger","nigga","chink","gook","spic","wetback","kike","raghead","towelhead",
    "faggot","fag","dyke","tranny","shemale","retard","retarded"
  ],
  fr: [
    "bougnoule","négro","négre","youpin","pd","pédé","gouine","travelo","mongol"
  ],
  es: [
    "sudaca","moro","maricón","maricon","tortillera","mongólico","mongolico"
  ],
  pt: [
    "crioulo","macaco","bicha","sapatão","veadinho","mongoloide"
  ],
  ru: [
    "чурка","чурка","хач","пидор","пидр","даун"
  ],
  zh: [
    "黑鬼","死基佬","人妖"
  ],
  ar_darija: [
    "3azi","3aziya","zamel","kahba","hmar","kelb","m3akaz"
  ],
  ar_egypt: [
    "3abd","abed","khawal","khawl","3ars","shaz","manyak"
  ]
};

// Flatten for quick check
export const SLURS_FLAT = Object.values(SLURS_100).flat().map(s=>s.toLowerCase());

export function containsSlur(text){
  if(!text) return null;
  const t = text.toLowerCase();
  for(const w of SLURS_FLAT){
    if(t.includes(w)) return w;
  }
  return null;
}

// Unified filter — returns first matched category or null
export function filterCheck(text){
  // import other lists dynamically if available
  return { slur: containsSlur(text) };
}
