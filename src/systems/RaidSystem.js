import { RAIDS } from '../config/contentCatalog.js';

export function createRaidInstance(raidId, party = []) {
  const raid = RAIDS.find((entry) => entry.id === raidId);
  if (!raid) throw new Error(`Unknown raid: ${raidId}`);
  return {
    id: `raid-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    raidId,
    party: [...party],
    encounterIndex: 0,
    bossPhase: 1,
    defeated: false,
    failed: false,
  };
}

export function advanceRaid(instance, bossHpPercent = 100) {
  if (!instance || instance.defeated || instance.failed) return instance;
  const raid = RAIDS.find((entry) => entry.id === instance.raidId);
  const next = { ...instance };
  next.bossPhase = bossHpPercent <= 66 ? (bossHpPercent <= 33 ? 3 : 2) : 1;
  next.encounterIndex = Math.min(raid.encounters.length - 1, next.encounterIndex + 1);
  if (next.encounterIndex >= raid.encounters.length - 1 && bossHpPercent <= 0) next.defeated = true;
  return next;
}

export function raidReward(instance) {
  if (!instance?.defeated) return null;
  const raid = RAIDS.find((entry) => entry.id === instance.raidId);
  return {
    raidId: instance.raidId,
    xp: raid.level * 600,
    gold: raid.level * 500,
    lootRolls: 4,
    guaranteedBossDrop: true,
  };
}

export { RAIDS };
