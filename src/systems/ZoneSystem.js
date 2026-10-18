import { BIOMES, getBiome } from '../config/contentCatalog.js';

export function createWorldState() {
  return { currentZone:'greenfall', unlockedZones:['greenfall'], discoveredPois:[], travelState:null };
}

export function canEnterZone(world, zoneId, playerLevel = 1) {
  const biome = getBiome(zoneId);
  return Boolean(biome && (world.unlockedZones.includes(zoneId) || playerLevel >= biome.level));
}

export function travel(world, zoneId, playerLevel = 1) {
  if (!canEnterZone(world, zoneId, playerLevel)) return { world, success:false, reason:'zone-locked' };
  const biome = getBiome(zoneId);
  const next = structuredClone(world);
  next.currentZone = zoneId;
  if (!next.unlockedZones.includes(zoneId)) next.unlockedZones.push(zoneId);
  next.travelState = { zoneId, startedAt:Date.now(), biome:biome.id };
  return { world:next, success:true };
}

export function randomEncounter(zoneId, random = Math.random()) {
  const biome = getBiome(zoneId);
  if (!biome) return null;
  if (random > 0.35) return null;
  const enemyLevel = Math.max(1, biome.level + Math.floor(random * 6));
  return { id:`encounter-${biome.id}-${Date.now()}`, biome:biome.id, enemyLevel, elite:random < 0.08 };
}

export { BIOMES };
