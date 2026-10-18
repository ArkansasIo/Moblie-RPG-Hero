import { BIOMES, getBiome } from '../config/contentCatalog.js';
import { WORLD_ZONES, getZone, canEnterZone } from '../rpg/zoneData.js';

export class WorldSystem {
  static listBiomes() { return [...BIOMES]; }
  static listZones() { return [...WORLD_ZONES]; }
  static enterZone(character, zoneId) {
    const zone = getZone(zoneId);
    if (!zone || !canEnterZone(zoneId, character?.level ?? 1)) return { ok: false, zone: null, reason: 'Level requirement not met or zone not found.' };
    return { ok: true, zone, character: { ...character, zoneId } };
  }
  static getBiomeForZone(zoneId) {
    const zone = getZone(zoneId);
    if (!zone) return null;
    return getBiome(zone.biomeId ?? zone.biome ?? zoneId) ?? null;
  }
}
