export const RARITIES = Object.freeze(['Common','Uncommon','Rare','Epic','Legendary','Mythic','Ancient','Unique']);
export const ITEM_TYPES = Object.freeze(['weapon','armor','accessory','relic','artifact','consumable','material','quest']);
export const AFFIXES = Object.freeze(['strength','dexterity','intelligence','vitality','criticalChance','criticalDamage','haste','armor','resistance','maxHealth','maxMana','lifeSteal','movementSpeed']);

export function getItemLevel(characterLevel, difficulty = 1, quality = 1) {
  return Math.max(1, Math.floor(characterLevel * 1 + difficulty * 8 + quality * 2));
}

export function rarityWeight(rarity) { return { Common:1, Uncommon:2, Rare:4, Epic:8, Legendary:16, Mythic:32, Ancient:64, Unique:100 }[rarity] ?? 1; }

export function rollRarity(seed = Math.random(), luck = 0) {
  const p = Math.max(0, Math.min(0.35, luck / 10000));
  const r = Math.max(0, Math.min(0.999999, seed));
  if (r < 0.002 + p) return 'Unique';
  if (r < 0.01 + p) return 'Ancient';
  if (r < 0.04 + p) return 'Mythic';
  if (r < 0.12 + p) return 'Legendary';
  if (r < 0.30 + p) return 'Epic';
  if (r < 0.60 + p) return 'Rare';
  if (r < 0.85 + p) return 'Uncommon';
  return 'Common';
}

export function rollAffixes(rarity, level, count = null) {
  const defaultCount = Math.max(0, RARITIES.indexOf(rarity) - 1);
  const total = Math.min(8, count ?? defaultCount);
  const result = [];
  for (let i = 0; i < total; i++) result.push({ id: AFFIXES[(level + i * 7) % AFFIXES.length], value: Math.floor(level * (0.5 + i * 0.18)) + 1 });
  return result;
}

export function generateLoot({ level = 1, difficulty = 1, luck = 0, type = 'weapon', seed = Math.random() } = {}) {
  const rarity = rollRarity(seed, luck);
  const itemLevel = getItemLevel(level, difficulty, rarityWeight(rarity));
  return { id:`loot-${Date.now()}-${Math.floor(seed * 100000)}`, type, rarity, itemLevel, requiredLevel: Math.max(1, level - 10), power: Math.floor(itemLevel * (1 + rarityWeight(rarity) * 0.15)), affixes:rollAffixes(rarity, itemLevel) };
}
