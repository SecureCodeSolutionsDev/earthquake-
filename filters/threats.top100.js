/**
 * TAYRIPAGES — Threats Filter — Top 100 threats across nations
 * Covers direct threats, doxxing, blackmail, sexual violence threats.
 * Languages: EN, FR, ES, PT, RU, ZH, AR-Darija, AR-EG
 * Separate file as requested.
 */
export const THREATS_100 = {
  en: [
    "i will kill you","i'll kill you","i will hurt you","i will find you","i know where you live",
    "i will hurt your family","i will rape you","i will leak your photos","i will share your nudes",
    "i will destroy you","i will beat you","you will regret","i have your address","i will come to your house",
    "i will stab you","i will shoot you","watch your back","you're dead","i will expose you"
  ],
  fr: [
    "je vais te tuer","je vais te buter","je vais te trouver","je sais où tu habites","je vais te faire du mal",
    "je vais violer","je vais diffuser tes photos","je vais partager tes nudes","je connais ton adresse",
    "je vais venir chez toi","tu vas le regretter","tu es mort","surveille tes arrières","je vais te frapper"
  ],
  es: [
    "te voy a matar","te voy a encontrar","sé dónde vives","te haré daño","te voy a violar",
    "difundiré tus fotos","conozco tu dirección","iré a tu casa","te vas a arrepentir","estás muerto"
  ],
  pt: [
    "vou te matar","vou te encontrar","sei onde você mora","vou te machucar","vou te estuprar",
    "vou vazar suas fotos","conheço seu endereço","vou na sua casa","você vai se arrepender"
  ],
  ru: [
    "я тебя убью","ya tebya ubyu","я тебя найду","ya tebya naydu","я знаю где ты живешь","я тебя изнасилую"
  ],
  zh: [
    "我要杀了你","我会找到你","我知道你住哪里","我要伤害你","我要泄露你的照片"
  ],
  ar_darija: [
    "ghan9tlk","ghanqtlk","ghanl9ak","3aref fin sakna","ghan2adik","ghanfde7k","ghan7et tsawrek","3aref 3onwanek","ghanharek","ghanderbk"
  ],
  ar_egypt: [
    "ha2tlk","ha2telek","ha3raf makanek","ha3mel fik","hanasher sowarak","3aref 3enwanak","hagilk el bet","hatndam"
  ]
};

export const THREATS_FLAT = Object.values(THREATS_100).flat().map(s=>s.toLowerCase());

export function containsThreat(text){
  if(!text) return null;
  const t = text.toLowerCase();
  for(const p of THREATS_FLAT){
    if(t.includes(p)) return p;
  }
  return null;
}
