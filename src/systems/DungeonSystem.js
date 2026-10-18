import { DUNGEONS, getDungeon } from '../config/contentCatalog.js';

export function createDungeonRun(dungeonId, party = []) {
  const dungeon = getDungeon(dungeonId);
  if (!dungeon) throw new Error(`Unknown dungeon: ${dungeonId}`);
  return {
    id: `run-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    dungeonId,
    party: [...party],
    level: dungeon.level,
    encounterIndex: 0,
    completed: false,
    rewardsClaimed: false,
    startedAt: Date.now(),
  };
}

export function advanceDungeon(run, success = true) {
  if (!run || run.completed) return run;
  const dungeon = getDungeon(run.dungeonId);
  const next = { ...run };
  if (!success) {
    next.completed = true;
    next.failed = true;
    return next;
  }
  next.encounterIndex += 1;
  if (next.encounterIndex >= dungeon.encounters.length) next.completed = true;
  return next;
}

export function dungeonReward(run) {
  if (!run?.completed || run.failed || run.rewardsClaimed) return null;
  const dungeon = getDungeon(run.dungeonId);
  return {
    dungeonId: run.dungeonId,
    xp: dungeon.level * 180,
    gold: dungeon.level * 125,
    lootRolls: 1 + Math.floor(dungeon.level / 10),
  };
}

export { DUNGEONS };
