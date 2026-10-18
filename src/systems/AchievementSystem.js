export const ACHIEVEMENTS = Object.freeze({
  firstBlood: { id: 'firstBlood', title: 'First Blood', target: 1, metric: 'kills', reward: { xp: 100, gold: 50 } },
  dungeonRunner: { id: 'dungeonRunner', title: 'Dungeon Runner', target: 10, metric: 'dungeons', reward: { xp: 500, gold: 250 } },
  towerClimber: { id: 'towerClimber', title: 'Tower Climber', target: 100, metric: 'towerFloor', reward: { xp: 5000, gold: 2500 } },
  raidBreaker: { id: 'raidBreaker', title: 'Raid Breaker', target: 5, metric: 'raids', reward: { xp: 5000, gold: 5000 } },
  worldBoss: { id: 'worldBoss', title: 'World Boss Slayer', target: 3, metric: 'worldBosses', reward: { xp: 7500, gold: 7500 } },
});

export function createAchievementState() {
  return { progress: {}, claimed: [] };
}

export function advanceAchievement(state, metric, amount = 1) {
  const next = { ...state, progress: { ...state.progress } };
  for (const achievement of Object.values(ACHIEVEMENTS)) {
    if (achievement.metric !== metric) continue;
    next.progress[achievement.id] = Math.max(0, (next.progress[achievement.id] ?? 0) + amount);
  }
  return next;
}

export function claimAchievement(state, achievementId) {
  const achievement = ACHIEVEMENTS[achievementId];
  if (!achievement) return { state, reward: null };
  const progress = state.progress[achievementId] ?? 0;
  if (progress < achievement.target || state.claimed.includes(achievementId)) return { state, reward: null };
  return {
    state: { ...state, claimed: [...state.claimed, achievementId] },
    reward: achievement.reward,
  };
}
