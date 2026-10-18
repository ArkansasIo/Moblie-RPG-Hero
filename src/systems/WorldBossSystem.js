import { WORLD_BOSSES } from '../config/contentCatalog.js';

export function spawnWorldBoss(bossId, level = 1) {
  const boss = WORLD_BOSSES.find((entry) => entry.id === bossId);
  if (!boss) throw new Error(`Unknown world boss: ${bossId}`);
  const scaledLevel = Math.max(level, boss.level ?? 1);
  const maxHp = Math.round(10000 * scaledLevel * 1.5);
  return { id:`worldboss-${bossId}-${Date.now()}`, bossId, name:boss.name, level:scaledLevel, maxHp, hp:maxHp, active:true, contributors:{}, phases:boss.phases??3, respawnMinutes:boss.respawnMinutes??180 };
}

export function damageWorldBoss(instance, playerId, damage) {
  if (!instance?.active || damage <= 0) return instance;
  const dealt = Math.min(instance.hp, Math.floor(damage));
  const hp = instance.hp - dealt;
  return { ...instance, hp, active:hp>0, contributors:{...instance.contributors,[playerId]:(instance.contributors[playerId]??0)+dealt} };
}

export function worldBossRewards(instance) {
  if (!instance || instance.active) return [];
  return Object.entries(instance.contributors).sort((a,b)=>b[1]-a[1]).map(([playerId,damage],index)=>({playerId,rank:index+1,damage,xp:Math.max(100,Math.round(damage*.5)),gold:Math.max(50,Math.round(damage*.1))}));
}

export { WORLD_BOSSES };
