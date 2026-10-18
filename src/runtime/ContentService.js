import { BIOMES, ZONE_CONTENT, MATERIALS, NPCS, STATUS_EFFECTS, TALENT_TREES, ACHIEVEMENTS, LOOT_TABLES, TOWER, ASSET_MANIFEST, FANTASY_STYLE } from '../data/index.js';
import { WORLD_BIOMES, WORLD_ZONES, DUNGEONS, TRAILS, RAIDS, TOWER_FLOORS, WORLD_CONTENT } from '../rpg/worldData.js';

const byId = (items = []) => new Map(items.map((item) => [item.id, item]));

export const CONTENT = Object.freeze({
  biomes: BIOMES,
  zones: ZONE_CONTENT,
  worldBiomes: WORLD_BIOMES,
  worldZones: WORLD_ZONES,
  materials: MATERIALS,
  npcs: NPCS,
  statusEffects: STATUS_EFFECTS,
  talents: TALENT_TREES,
  achievements: ACHIEVEMENTS,
  lootTables: LOOT_TABLES,
  dungeons: DUNGEONS,
  trails: TRAILS,
  raids: RAIDS,
  tower: TOWER,
  towerFloors: TOWER_FLOORS,
  world: WORLD_CONTENT,
  assets: ASSET_MANIFEST,
  fantasyStyle: FANTASY_STYLE,
});

export function getZone(id) { return WORLD_ZONES.find((zone) => zone.id === id) ?? null; }
export function getBiome(id) { return WORLD_BIOMES.find((biome) => biome.id === id) ?? null; }
export function getDungeon(id) { return DUNGEONS.find((dungeon) => dungeon.id === id) ?? null; }
export function getTrail(id) { return TRAILS.find((trail) => trail.id === id) ?? null; }
export function getRaid(id) { return RAIDS.find((raid) => raid.id === id) ?? null; }
export function getTowerFloor(floor) { return TOWER_FLOORS[floor - 1] ?? null; }
export function getFantasyAsset(path) { return new URL(path, import.meta.url).href; }
export function getFantasyAtlas() { return getFantasyAsset('../assets/generated/dnd5e-inspired-atlas.svg'); }

export function availableZones(level) {
  return WORLD_ZONES.filter((zone) => level >= zone.level[0] && level <= zone.level[1] + 10);
}

export function availableDungeons(level) {
  return DUNGEONS.filter((dungeon) => level >= dungeon.level[0]);
}

export function availableRaids(level) {
  return RAIDS.filter((raid) => level >= raid.level[0]);
}

export function contentSummary() {
  return {
    zones: WORLD_ZONES.length,
    biomes: WORLD_BIOMES.length,
    dungeons: DUNGEONS.length,
    trails: TRAILS.length,
    raids: RAIDS.length,
    towerFloors: TOWER_FLOORS.length,
    materials: MATERIALS.length,
    npcs: NPCS.length,
    achievements: ACHIEVEMENTS.length,
    statusEffects: Object.keys(STATUS_EFFECTS).length,
    talentTrees: Object.keys(TALENT_TREES).length,
    fantasyAssetAtlas: ASSET_MANIFEST.atlases.dnd5e,
  };
}

export function lookupCatalog(list, id) {
  return byId(list)[id] ?? null;
}
