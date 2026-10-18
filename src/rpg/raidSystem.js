import { RAIDS } from './worldData.js';

export function getAvailableRaids(level) { return RAIDS.filter(r=>level>=r.level[0]&&level<=r.level[1]); }
export function createRaidInstance(raidId, party=[]) { const raid=RAIDS.find(r=>r.id===raidId); if(!raid) throw new Error(`Unknown raid: ${raidId}`); return {instanceId:`raid-${raidId}-${Date.now()}`,raidId,party:[...party],wing:1,bossIndex:0,clearedBosses:[],state:'active',startedAt:Date.now()}; }
export function advanceRaid(instance,bossName) { const raid=RAIDS.find(r=>r.id===instance.raidId); const cleared=[...new Set([...instance.clearedBosses,bossName])]; const next=Math.min(raid.bosses.length,instance.bossIndex+1); return {...instance,clearedBosses:cleared,bossIndex:next,wing:Math.min(raid.wings,Math.ceil(next/Math.max(1,raid.bosses.length/raid.wings))),state:next>=raid.bosses.length?'complete':'active'}; }
export function getRaidLockoutKey(playerId,raidId,weekId) { return `raid-lockout:${playerId}:${raidId}:${weekId}`; }
