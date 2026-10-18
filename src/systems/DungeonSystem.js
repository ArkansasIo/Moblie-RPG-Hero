import { DUNGEONS, getDungeon } from '../config/contentCatalog.js';

export function createDungeonRun(dungeonId, party = []) {
  const dungeon = getDungeon(dungeonId);
  if (!dungeon) throw new Error(`Unknown dungeon: ${dungeonId}`);
  const minLevel = dungeon.minLevel ?? dungeon.level?.[0] ?? 1;
  const maxLevel = dungeon.maxLevel ?? dungeon.level?.[1] ?? minLevel;
  const encounterCount = Math.max(1, dungeon.rooms ?? dungeon.bosses?.length ?? 1);
  return { id:`run-${Date.now()}-${Math.floor(Math.random()*10000)}`, dungeonId, party:[...party], minLevel, maxLevel, encounterCount, encounterIndex:0, completed:false, failed:false, rewardsClaimed:false, startedAt:Date.now() };
}

export function canEnterDungeon(dungeonId, playerLevel, partySize = 1) {
  const dungeon = getDungeon(dungeonId);
  if (!dungeon) return false;
  const minLevel = dungeon.minLevel ?? dungeon.level?.[0] ?? 1;
  return playerLevel >= minLevel && partySize >= 1;
}

export function advanceDungeon(run, success = true) {
  if (!run || run.completed || run.failed) return run;
  const next = { ...run };
  if (!success) { next.completed = true; next.failed = true; return next; }
  next.encounterIndex += 1;
  if (next.encounterIndex >= next.encounterCount) next.completed = true;
  return next;
}

export function dungeonReward(run) {
  if (!run?.completed || run.failed || run.rewardsClaimed) return null;
  const dungeon = getDungeon(run.dungeonId);
  const level = dungeon.minLevel ?? dungeon.level?.[0] ?? 1;
  return { dungeonId:run.dungeonId, xp:Math.floor(level*180+run.encounterCount*30), gold:Math.floor(level*125+run.encounterCount*20), lootRolls:1+Math.floor(level/10) };
}

export { DUNGEONS };
