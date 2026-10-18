export const CORE_ATTRIBUTES = Object.freeze(['STR','DEX','CON','INT','WIS','VIT','SPI','LCK','WIL','CHA']);

export const CHARACTER_CLASSES = Object.freeze([
  { id:'warrior', name:'Warrior', role:'tank-dps', primary:['STR','CON'], armor:'plate', weapons:['sword','greatsword','axe','shield'] },
  { id:'knight', name:'Knight', role:'tank', primary:['CON','STR'], armor:'plate', weapons:['sword','mace','shield'] },
  { id:'berserker', name:'Berserker', role:'melee-dps', primary:['STR','VIT'], armor:'mail', weapons:['great-axe','greatsword'] },
  { id:'rogue', name:'Rogue', role:'melee-dps', primary:['DEX','LCK'], armor:'leather', weapons:['dagger','sword'] },
  { id:'assassin', name:'Assassin', role:'burst-dps', primary:['DEX','LCK'], armor:'leather', weapons:['dagger'] },
  { id:'ranger', name:'Ranger', role:'ranged-dps', primary:['DEX','WIS'], armor:'leather', weapons:['bow','crossbow'] },
  { id:'mage', name:'Mage', role:'caster-dps', primary:['INT','WIL'], armor:'cloth', weapons:['staff','wand'] },
  { id:'elementalist', name:'Elementalist', role:'caster-dps', primary:['INT','SPI'], armor:'cloth', weapons:['staff','wand'] },
  { id:'cleric', name:'Cleric', role:'healer', primary:['WIS','SPI'], armor:'cloth', weapons:['mace','staff','shield'] },
  { id:'paladin', name:'Paladin', role:'tank-healer', primary:['CON','WIS'], armor:'plate', weapons:['sword','mace','shield'] },
  { id:'necromancer', name:'Necromancer', role:'caster-dps', primary:['INT','WIL'], armor:'cloth', weapons:['staff','wand'] },
  { id:'summoner', name:'Summoner', role:'pet-dps', primary:['INT','CHA'], armor:'cloth', weapons:['staff','wand'] },
  { id:'battlemage', name:'Battlemage', role:'hybrid', primary:['STR','INT'], armor:'mail', weapons:['sword','staff'] }
]);

export const MAX_LEVEL = 100;
export function requiredCharacterXP(level) { return level >= MAX_LEVEL ? 0 : Math.floor(500 * Math.pow(level, 2.25)); }
export function getCharacterClass(id) { return CHARACTER_CLASSES.find(c => c.id === id) ?? null; }
export function createDefaultAttributes() { return Object.fromEntries(CORE_ATTRIBUTES.map(a => [a, 10])); }
