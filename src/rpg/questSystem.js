export const QUEST_TYPES = Object.freeze(['main','side','daily','weekly','repeatable','world','class','faction','achievement','event','bounty','guild']);
export const OBJECTIVES = Object.freeze(['kill','collect','escort','interact','explore','survive','boss','craft','travel','completeDungeon']);

export function createQuest(definition) { return { id:definition.id, name:definition.name, type:definition.type ?? 'side', objectives:(definition.objectives ?? []).map((o, index) => ({ id:o.id ?? `${definition.id}-${index}`, type:o.type, target:o.target, required:o.required ?? 1, progress:0, complete:false })), rewards:definition.rewards ?? {}, state:'available' }; }
export function createQuestState(questId) { return { questId, status:'available', progress:{}, startedAt:null, completedAt:null, rewardClaimed:false }; }
export function startQuest(state) { return { ...state, status:'active', startedAt:Date.now() }; }
export function acceptQuest(quest) { return { ...quest, state:'active' }; }
export function updateQuestProgress(state,key,value) { return { ...state, progress:{...state.progress,[key]:Math.max(0,Number(value)||0)} }; }
export function advanceQuest(quest, objectiveId, amount = 1) { const objectives=quest.objectives.map(o=>o.id===objectiveId?{...o,progress:Math.min(o.required,o.progress+Math.max(0,amount)),complete:o.progress+Math.max(0,amount)>=o.required}:o); const complete=objectives.length>0&&objectives.every(o=>o.complete); return {...quest,objectives,state:complete?'complete':'active'}; }
export function completeQuest(state) { return {...state,status:'complete',completedAt:Date.now()}; }
export function canTurnInQuest(quest) { return quest?.state === 'complete' || quest?.status === 'complete'; }
export function claimQuestReward(state) { if(state.status!=='complete') return state; return {...state,rewardClaimed:true}; }
export function resetRepeatableQuest(state) { return {...state,status:'available',progress:{},startedAt:null,completedAt:null,rewardClaimed:false}; }
export function abandonQuest(quest) { return {...quest,state:'abandoned'}; }
export function calculateQuestXP(level,difficulty=1) { return Math.floor(100+level*35+Math.pow(level,1.15)*difficulty*20); }
export function calculateQuestGold(level,difficulty=1) { return Math.floor(25+level*12+Math.pow(level,1.1)*difficulty*4); }
