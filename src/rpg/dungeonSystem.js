import { DUNGEONS, TRAILS } from './worldData.js';

export function getAvailableDungeons(level, difficulty=null) { return DUNGEONS.filter(d=>level>=d.level[0]&&level<=d.level[1]&&(!difficulty||d.tier===difficulty)); }
export function getAvailableTrails(level) { return TRAILS.filter(t=>level>=t.level[0]&&level<=t.level[1]); }
export function createDungeonInstance(dungeonId, party=[], difficulty='normal') { const template=DUNGEONS.find(d=>d.id===dungeonId); if(!template) throw new Error(`Unknown dungeon: ${dungeonId}`); return {instanceId:`${dungeonId}-${Date.now()}`,dungeonId,party:[...party],difficulty,state:'active',startedAt:Date.now(),bossIndex:0,clearedBosses:[],lootSeed:Math.floor(Math.random()*2147483647)}; }
export function completeDungeonBoss(instance,bossName) { return {...instance,clearedBosses:[...new Set([...instance.clearedBosses,bossName])],bossIndex:instance.bossIndex+1}; }
export function isDungeonComplete(instance) { const d=DUNGEONS.find(x=>x.id===instance.dungeonId); return !!d && instance.clearedBosses.length>=d.bosses.length; }
