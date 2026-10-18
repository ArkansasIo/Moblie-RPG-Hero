export const ACHIEVEMENTS = Object.freeze([
  {id:'first_blood',name:'First Blood',description:'Defeat your first enemy.',goal:1,reward:{gold:100,xp:100}},
  {id:'dungeon_delver',name:'Dungeon Delver',description:'Clear 10 dungeons.',goal:10,reward:{gold:1000,xp:1000}},
  {id:'raid_ready',name:'Raid Ready',description:'Clear a raid.',goal:1,reward:{gold:5000,xp:5000}},
  {id:'tower_climber',name:'Tower Climber',description:'Reach floor 50.',goal:50,reward:{gold:10000,xp:10000}},
  {id:'tower_master',name:'Tower Master',description:'Clear floor 100.',goal:100,reward:{gold:50000,xp:50000}},
  {id:'master_crafter',name:'Master Crafter',description:'Craft 100 items.',goal:100,reward:{gold:5000,xp:2500}},
  {id:'explorer',name:'World Explorer',description:'Discover 50 points of interest.',goal:50,reward:{gold:2500,xp:5000}},
  {id:'boss_hunter',name:'Boss Hunter',description:'Defeat 25 world bosses.',goal:25,reward:{gold:25000,xp:25000}},
  {id:'legendary',name:'Legendary',description:'Equip a legendary item.',goal:1,reward:{gold:10000,xp:10000}}
]);
export function getAchievement(id){return ACHIEVEMENTS.find(a=>a.id===id)||null}
