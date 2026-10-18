const ATTRIBUTES = Object.freeze(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'vitality', 'spirit', 'luck', 'willpower', 'charisma']);

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const DEFAULT_STATS = Object.freeze({
  level: 1,
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  vitality: 10,
  spirit: 10,
  luck: 10,
  willpower: 10,
  charisma: 10,
  gearPower: 0,
});

export function normalizeStats(input = {}) {
  const stats = { ...DEFAULT_STATS, ...input };
  for (const key of ATTRIBUTES) stats[key] = Math.max(1, Number(stats[key]) || 1);
  stats.level = Math.max(1, Math.floor(Number(stats.level) || 1));
  stats.gearPower = Math.max(0, Number(stats.gearPower) || 0);
  return stats;
}

export function deriveStats(input = {}) {
  const s = normalizeStats(input);
  const maxHp = Math.floor(s.vitality * 15 + s.constitution * 10 + s.level * 25 + s.gearPower * 2);
  const maxMana = Math.floor(s.intelligence * 10 + s.spirit * 8 + s.level * 12);
  const attack = Math.floor(s.strength * 2.4 + s.dexterity * 0.8 + s.gearPower);
  const spellPower = Math.floor(s.intelligence * 2.5 + s.wisdom * 0.8 + s.gearPower);
  const armor = Math.floor(s.constitution * 1.5 + s.dexterity * 0.5 + s.gearPower * 0.7);
  const critChance = clamp(0.05 + s.luck * 0.003 + s.dexterity * 0.001, 0, 0.75);
  const haste = clamp(1 + s.dexterity * 0.01, 1, 2.5);
  const moveSpeed = 100 + s.dexterity * 1.5;
  return Object.freeze({ maxHp, maxMana, attack, spellPower, armor, critChance, haste, moveSpeed });
}

export function calculateGearPower(items = []) {
  return items.reduce((total, item) => total + Math.max(0, Number(item?.power) || 0), 0);
}

export function applyAttributePoints(stats, points = {}) {
  const next = normalizeStats(stats);
  for (const key of ATTRIBUTES) next[key] += Math.max(0, Math.floor(Number(points[key]) || 0));
  return next;
}

export { ATTRIBUTES, clamp };
