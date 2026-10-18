export const SAVE_SCHEMA_VERSION = 2;

export function createDefaultSave() {
  return {
    schemaVersion: SAVE_SCHEMA_VERSION,
    player: { id: crypto.randomUUID(), name: 'Hero', level: 1, xp: 0, gold: 0, attributes: {}, gearPower: 0 },
    inventory: { slotCount: 60, items: [], equipped: {} },
    progression: { wave: 1, towerFloor: 1, quests: [], achievements: [] },
    world: { biome: 'greenfall', unlockedZones: ['greenfall'], discoveredPois: [] },
    social: { friends: [], party: null, guild: null, chat: [], notifications: [] },
    settings: { music: true, sfx: true, vibration: true, quality: 'auto' },
  };
}

export function migrateSave(input) {
  const base = createDefaultSave();
  if (!input || typeof input !== 'object') return base;
  const migrated = structuredClone(base);
  Object.assign(migrated, input);
  migrated.schemaVersion = SAVE_SCHEMA_VERSION;
  migrated.player = { ...base.player, ...(input.player ?? {}) };
  migrated.inventory = { ...base.inventory, ...(input.inventory ?? {}) };
  migrated.progression = { ...base.progression, ...(input.progression ?? {}) };
  migrated.world = { ...base.world, ...(input.world ?? {}) };
  migrated.social = { ...base.social, ...(input.social ?? {}) };
  migrated.settings = { ...base.settings, ...(input.settings ?? {}) };
  return migrated;
}

export function serializeSave(save) { return JSON.stringify(migrateSave(save)); }
export function parseSave(raw) { try { return migrateSave(JSON.parse(raw)); } catch { return createDefaultSave(); } }
