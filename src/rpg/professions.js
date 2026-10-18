// Data-driven profession catalog for the mobile RPG prototype.
export const PROFESSIONS = Object.freeze([
  { id: 'blacksmithing', name: 'Blacksmithing', category: 'crafting', gathers: [], outputs: ['weapons', 'armor', 'upgrade-materials'], station: 'forge' },
  { id: 'alchemy', name: 'Alchemy', category: 'crafting', gathers: ['herbalism'], outputs: ['potions', 'elixirs', 'resistance-tonics'], station: 'alchemy-table' },
  { id: 'tailoring', name: 'Tailoring', category: 'crafting', gathers: ['herbalism'], outputs: ['cloth-armor', 'bags', 'spellweave'], station: 'loom' },
  { id: 'jewelcrafting', name: 'Jewelcrafting', category: 'crafting', gathers: ['mining'], outputs: ['rings', 'amulets', 'gems'], station: 'jeweler-bench' },
  { id: 'cooking', name: 'Cooking', category: 'crafting', gathers: ['fishing'], outputs: ['food-buffs', 'rations', 'feasts'], station: 'cooking-fire' },
  { id: 'engineering', name: 'Engineering', category: 'crafting', gathers: ['mining', 'logging'], outputs: ['traps', 'gadgets', 'ranged-modules'], station: 'workbench' },
  { id: 'mining', name: 'Mining', category: 'gathering', gathers: [], outputs: ['ore', 'stone', 'crystal'], station: null },
  { id: 'logging', name: 'Logging', category: 'gathering', gathers: [], outputs: ['timber', 'resin', 'rare-wood'], station: null },
  { id: 'herbalism', name: 'Herbalism', category: 'gathering', gathers: [], outputs: ['herbs', 'mushrooms', 'arcane-plants'], station: null },
  { id: 'skinning', name: 'Skinning', category: 'gathering', gathers: [], outputs: ['hides', 'scales', 'monster-components'], station: null },
  { id: 'fishing', name: 'Fishing', category: 'gathering', gathers: [], outputs: ['fish', 'shells', 'rare-catches'], station: null },
  { id: 'archaeology', name: 'Archaeology', category: 'gathering', gathers: [], outputs: ['relic-fragments', 'ancient-coins', 'lore-items'], station: null }
]);

export const PROFESSION_MAX_LEVEL = 100;
export const PROFESSION_XP = Object.freeze({
  requiredForNextLevel(level) {
    if (!Number.isInteger(level) || level < 1 || level >= PROFESSION_MAX_LEVEL) return 0;
    return Math.floor(100 + 35 * level + 8 * Math.pow(level, 1.55));
  }
});

export function getProfession(professionId) {
  return PROFESSIONS.find((profession) => profession.id === professionId) ?? null;
}

export function canCraftAt(professionId, stationId) {
  const profession = getProfession(professionId);
  return Boolean(profession && profession.category === 'crafting' && profession.station === stationId);
}

export function validateProfessionProgress(progress = {}) {
  const errors = [];
  for (const [professionId, entry] of Object.entries(progress)) {
    if (!getProfession(professionId)) errors.push(`Unknown profession: ${professionId}`);
    if (!entry || !Number.isInteger(entry.level) || entry.level < 1 || entry.level > PROFESSION_MAX_LEVEL) {
      errors.push(`Invalid level for ${professionId}`);
    }
    if (!entry || !Number.isFinite(entry.xp) || entry.xp < 0) {
      errors.push(`Invalid XP for ${professionId}`);
    }
  }
  return { valid: errors.length === 0, errors };
}
