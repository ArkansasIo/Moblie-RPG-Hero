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

/** Maximum character level. World tiers remain independent from character level. */
export const MAX_LEVEL = 720;
export const LEVEL_CAP = MAX_LEVEL;

/**
 * XP required to advance from `level` to `level + 1`.
 * A 2.25 power curve preserves the original game's early progression while
 * providing a long-form 1-720 endgame without requiring a 720-row hardcoded table.
 */
export function requiredCharacterXP(level) {
  if (!Number.isInteger(level) || level < 1) throw new RangeError('level must be an integer >= 1');
  return level >= MAX_LEVEL ? 0 : Math.max(1, Math.floor(500 * Math.pow(level, 2.25)));
}

/** Total XP required to reach the beginning of a level. */
export function totalCharacterXPForLevel(level) {
  if (!Number.isInteger(level) || level < 1 || level > MAX_LEVEL) {
    throw new RangeError(`level must be an integer from 1 to ${MAX_LEVEL}`);
  }
  let total = 0;
  for (let current = 1; current < level; current += 1) total += requiredCharacterXP(current);
  return total;
}

/** Resolve a character level from accumulated XP, capped at 720. */
export function levelFromCharacterXP(xp) {
  if (!Number.isFinite(xp) || xp < 0) throw new RangeError('xp must be a finite number >= 0');
  let level = 1;
  let remaining = Math.floor(xp);
  while (level < MAX_LEVEL) {
    const needed = requiredCharacterXP(level);
    if (remaining < needed) break;
    remaining -= needed;
    level += 1;
  }
  return level;
}

/** Generate a compact progression record for UI, save files and tests. */
export function getLevelProgression(level) {
  if (!Number.isInteger(level) || level < 1 || level > MAX_LEVEL) {
    throw new RangeError(`level must be an integer from 1 to ${MAX_LEVEL}`);
  }
  const requiredXP = requiredCharacterXP(level);
  const totalXP = totalCharacterXPForLevel(level);
  const bracket = Math.floor((level - 1) / 60) + 1;
  return Object.freeze({
    level,
    maxLevel: MAX_LEVEL,
    requiredXP,
    totalXP,
    bracket,
    bracketLevel: ((level - 1) % 60) + 1,
    isCap: level === MAX_LEVEL
  });
}

export function getCharacterClass(id) { return CHARACTER_CLASSES.find(c => c.id === id) ?? null; }
export function createDefaultAttributes() { return Object.fromEntries(CORE_ATTRIBUTES.map(a => [a, 10])); }
