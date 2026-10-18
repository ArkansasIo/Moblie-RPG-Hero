import { TOWER_FLOORS } from './worldData.js';

export function getTowerFloor(floor) { return TOWER_FLOORS[Math.max(0,Math.min(99,Math.floor(floor)-1))]; }
export function createTowerRun(playerId, seasonId='default') { return {runId:`tower-${playerId}-${seasonId}-${Date.now()}`,playerId,seasonId,floor:1,bestFloor:0,state:'active',startedAt:Date.now(),modifiers:[]}; }
export function completeTowerFloor(run) { const next=Math.min(100,run.floor+1); return {...run,floor:next,bestFloor:Math.max(run.bestFloor,next-1),state:next>100?'complete':'active'}; }
export function addTowerModifier(run, modifier) { return {...run,modifiers:[...run.modifiers,modifier]}; }
export function getTowerReward(floor) { const f=getTowerFloor(floor); return {floor:f.floor,type:f.type,rewards:f.rewards}; }
