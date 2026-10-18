export const ACHIEVEMENTS = Object.freeze([
  {id:'first-blood',name:'First Blood',goal:'kill',target:1,reward:{gold:100}},
  {id:'dungeon-runner',name:'Dungeon Runner',goal:'dungeons',target:10,reward:{title:'Delver'}},
  {id:'raid-conqueror',name:'Raid Conqueror',goal:'raids',target:10,reward:{title:'Raider'}},
  {id:'tower-master',name:'Tower Master',goal:'towerFloor',target:100,reward:{title:'Ascendant'}},
  {id:'max-level',name:'Beyond Mortal',goal:'level',target:720,reward:{title:'Eternal'}},
  {id:'master-crafter',name:'Master Crafter',goal:'profession',target:100,reward:{title:'Artisan'}}
]);
export function createAchievementState() { return Object.fromEntries(ACHIEVEMENTS.map(a=>[a.id,{progress:0,complete:false,claimed:false}])); }
export function updateAchievement(state,id,amount=1) { const a=ACHIEVEMENTS.find(x=>x.id===id); if(!a)return state; const current=state[id]??{progress:0,complete:false,claimed:false}; const progress=Math.min(a.target,current.progress+Math.max(0,amount)); return {...state,[id]:{...current,progress,complete:progress>=a.target}}; }
export function claimAchievement(state,id) { if(!state[id]?.complete)return state; return {...state,[id]:{...state[id],claimed:true}}; }
