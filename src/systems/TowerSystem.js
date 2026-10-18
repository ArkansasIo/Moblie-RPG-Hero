export const TOWER_MAX_FLOOR = 100;

const BIOME_ROTATION = ['greenfall', 'sunreach', 'ashen', 'frostveil', 'voidreach'];
const BOSS_NAMES = ['Stone Sentinel', 'Flame Warden', 'Frost Reaver', 'Arcane Judge', 'Void Champion'];

export function getTowerFloor(floor) {
  const value = Math.max(1, Math.min(TOWER_MAX_FLOOR, Math.floor(floor)));
  const boss = value % 10 === 0;
  const tier = Math.ceil(value / 10);
  return Object.freeze({
    floor: value,
    tier,
    biome: BIOME_ROTATION[(tier - 1) % BIOME_ROTATION.length],
    enemyLevel: Math.max(1, value + 4),
    enemyCount: boss ? 1 : Math.min(6, 2 + Math.floor(value / 20)),
    boss,
    bossName: boss ? BOSS_NAMES[(tier - 1) % BOSS_NAMES.length] : null,
    rewardMultiplier: 1 + value * 0.035,
    firstClear: `tower-${value}-first-clear`,
  });
}

export function getTowerRun(startFloor = 1, count = 10) {
  const start = Math.max(1, Math.min(TOWER_MAX_FLOOR, Math.floor(startFloor)));
  const end = Math.min(TOWER_MAX_FLOOR, start + Math.max(0, count) - 1);
  return Array.from({ length: end - start + 1 }, (_, index) => getTowerFloor(start + index));
}

export function towerRewards(floor) {
  const data = getTowerFloor(floor);
  return { xp: Math.floor(100 + data.floor ** 1.65), gold: Math.floor(50 + data.floor ** 1.4), gearPower: Math.floor(data.floor * 2.5) };
}
