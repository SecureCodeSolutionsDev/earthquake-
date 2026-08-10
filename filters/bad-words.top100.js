/**
 * TAYRIPAGES — Bad Words Filter — Top 100 across nations
 * Languages: EN (USA/UK), FR (France/Belgium/Switzerland), ES (Spain), PT (Portugal/Brazil),
 *           RU (Russia), ZH (China), AR-Darija (Morocco), AR-EG (Egypt/Middle East)
 * Usage: for client-side pre-check + server-side validation before posting bio/messages.
 * File is standalone — import before sending text to Firebase.
 * Keep lists lowercase, check with text.toLowerCase().includes(word)
 */
export const BAD_WORDS_100 = {
  // ENGLISH — 18
  en: [
    "fuck","fucking","fucked","fucker","motherfucker","shit","shitting","bullshit",
    "bitch","bitches","asshole","bastard","dick","dicks","dickhead","cock",
    "pussy","cunt","whore","slut","cum","jizz","tits","boobs","horny","nude","naked","porn"
  ],
  // FRENCH — 16
  fr: [
    "pute","putain","salope","salaud","connard","connasse","encule","enculé","merde","bordel",
    "chienne","bite","couilles","cul","nique","niquer","baise","baiser","branler","suce"
  ],
  // SPANISH — 14
  es: [
    "puta","puto","cabrón","cabron","gilipollas","hijo de puta","coño","cono","mierda","joder",
    "zorra","perra","culo","polla","verga","cojones"
  ],
  // PORTUGUESE — 12
  pt: [
    "puta","puto","caralho","porra","vadia","vagabunda","filho da puta","merda","cu","buceta",
    "pica","rola","boquete"
  ],
  // RUSSIAN — 10 (Cyrillic + transliteration)
  ru: [
    "блядь","blyad","сука","suka","хуй","hui","пизда","pizda","ебать","ebat","мудак","mudak","шлюха","shlyuha","долбоеб"
  ],
  // CHINESE — 8 (Hanzi)
  zh: [
    "他妈的","傻逼","操","操你妈","婊子","贱人","混蛋","王八蛋"
  ],
  // ARABIC — DARIJA (Moroccan) — Latin + Arabic script — 22
  ar_darija: [
    // latin
    "wld lqahba","weld lqahba","qahba","kahba","9ahba","zamel","zamel","nik","nik mok","zeb","zab","hmar","kelb","kelba","tabon","tbon","wld l7ram","wld zna","na3al mok","nik omok","wld lkahba",
    // arabic script
    "ولد القحبة","قحبة","زامل","نيك","زب","حمار","كلب","طابون","ولد الحرام","نعل امك"
  ],
  // ARABIC — EGYPTIAN / Middle East (Egyptian dialect + MSA) — 18
  ar_egypt: [
    // latin
    "kos","kos omak","sharmouta","sharmota","khawal","khawl","mitnak","mtnak","ibn mitnaka","ya ibn el sharmouta","kos omak","ya khawal","ya 3ars","3ars","manyaka","sharmoota",
    // arabic script
    "كس","شرموطة","خول","متناك","ابن متناكة","يا خول","عرص","منيوكة","كس امك"
  ]
};

// Flattened 100+ list for quick check (all languages)
export const BAD_WORDS_FLAT = Object.values(BAD_WORDS_100).flat().map(w=>w.toLowerCase());

// Simple checker (case-insensitive, diacritics stripped)
export function containsBadWord(text){
  if(!text) return null;
  const t = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"");
  for(const w of BAD_WORDS_FLAT){
    if(t.includes(w.toLowerCase())) return w;
  }
  return null;
}
