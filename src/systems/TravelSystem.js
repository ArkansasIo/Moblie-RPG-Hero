import { TRAILS, getZone } from '../rpg/zoneData.js';

export class TravelSystem {
  static travel(character, zoneId) {
    const zone = getZone(zoneId);
    if (!zone) return { ok: false, reason: 'Unknown zone.' };
    if ((character?.level ?? 1) < zone.minLevel) return { ok: false, reason: 'Level requirement not met.' };
    return { ok: true, zone, travelSeconds: Math.max(1, Math.round(3 + Math.abs((character.level ?? 1) - zone.minLevel) * 0.5)) };
  }

  static getTrail(trailId) { return TRAILS.find((trail) => trail.id === trailId) ?? null; }
  static canRunTrail(character, trailId) {
    const trail = this.getTrail(trailId);
    return Boolean(trail && (character?.level ?? 1) >= trail.minLevel);
  }
}
