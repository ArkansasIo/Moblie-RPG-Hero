import { TRAILS } from '../rpg/zoneData.js';

export class TrailSystem {
  static createRun(trailId, characterLevel = 1) {
    const trail = TRAILS.find((entry) => entry.id === trailId);
    if (!trail || characterLevel < trail.minLevel) return null;
    return { id: `${trailId}-${Date.now()}`, trailId, encounter: 0, totalEncounters: trail.encounters, state: 'active' };
  }

  static advance(run, victories = 1) {
    if (!run || run.state !== 'active') return run;
    const encounter = Math.min(run.totalEncounters, run.encounter + Math.max(0, victories));
    return { ...run, encounter, state: encounter >= run.totalEncounters ? 'completed' : 'active' };
  }

  static progress(run) { return run?.totalEncounters ? run.encounter / run.totalEncounters : 0; }
}
