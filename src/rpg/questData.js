export const QUEST_TYPES = Object.freeze(['main','side','daily','weekly','event','world']);
export const QUEST_STATES = Object.freeze(['available','active','completed','claimed']);

export const STARTER_QUESTS = Object.freeze([
  { id:'first-blood', type:'main', title:'First Blood', objective:{kind:'kill', count:3}, rewards:{xp:150,gold:50} },
  { id:'gathering-roots', type:'side', title:'Gathering Roots', objective:{kind:'gather', itemId:'herb', count:5}, rewards:{xp:100,gold:25} },
  { id:'gear-up', type:'main', title:'Gear Up', objective:{kind:'equip', count:1}, rewards:{xp:200,gold:75} }
]);

export function createQuestState(questId) { return { questId, state:'available', progress:0, claimed:false }; }
export function advanceQuest(state, amount = 1) { return { ...state, progress: Math.max(0, state.progress + amount) }; }
