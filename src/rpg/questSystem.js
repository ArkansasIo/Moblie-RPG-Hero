export const QUEST_TYPES = Object.freeze(['main','side','daily','weekly','event','world','bounty','guild']);

export function createQuestState(questId) { return {questId,status:'available',progress:{},startedAt:null,completedAt:null,rewardClaimed:false}; }
export function startQuest(state) { return {...state,status:'active',startedAt:Date.now()}; }
export function updateQuestProgress(state,key,value) { return {...state,progress:{...state.progress,[key]:Math.max(0,Number(value)||0)}}; }
export function completeQuest(state) { return {...state,status:'complete',completedAt:Date.now()}; }
export function claimQuestReward(state) { if(state.status!=='complete') return state; return {...state,rewardClaimed:true}; }
export function resetRepeatableQuest(state) { return {...state,status:'available',progress:{},startedAt:null,completedAt:null,rewardClaimed:false}; }
