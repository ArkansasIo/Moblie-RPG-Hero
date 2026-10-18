import { RAIDS } from '../config/contentCatalog.js';

export function createRaidInstance(raidId, party = []) {
  const raid = RAIDS.find((entry) => entry.id === raidId);
  if (!raid) throw new Error(`Unknown raid: ${raidId}`);
  return { id:`raid-${Date.now()}-${Math.floor(Math.random()*10000)}`, raidId, party:[...party], encounterIndex:0, encounterCount:Math.max(1,raid.bosses?.length??raid.rooms??1), bossPhase:1, defeated:false, failed:false, startedAt:Date.now() };
}

export function canQueueRaid(raidId, playerLevel, partySize = 1) {
  const raid = RAIDS.find((entry) => entry.id === raidId);
  if (!raid) return false;
  const minLevel = raid.minLevel ?? raid.level?.[0] ?? 1;
  const maxPlayers = Array.isArray(raid.partySize) ? raid.partySize[1] : raid.partySize ?? 1;
  return playerLevel >= minLevel && partySize >= 1 && partySize <= maxPlayers;
}

export function advanceRaid(instance, bossHpPercent = 100) {
  if (!instance || instance.defeated || instance.failed) return instance;
  const next = { ...instance };
  next.bossPhase = bossHpPercent <= 33 ? 3 : bossHpPercent <= 66 ? 2 : 1;
  next.encounterIndex = Math.min(instance.encounterCount - 1, instance.encounterIndex + 1);
  if (next.encounterIndex >= instance.encounterCount - 1 && bossHpPercent <= 0) next.defeated = true;
  return next;
}

export function raidReward(instance) {
  if (!instance?.defeated) return null;
  const raid = RAIDS.find((entry) => entry.id === instance.raidId);
  const level = raid.minLevel ?? raid.level?.[0] ?? 1;
  return { raidId:instance.raidId, xp:level*600, gold:level*500, lootRolls:4, guaranteedBossDrop:true };
}

export { RAIDS };
