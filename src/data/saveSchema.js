export const SAVE_VERSION=2;
export const DEFAULT_SAVE=Object.freeze({version:SAVE_VERSION,player:null,inventory:[],equipment:{},quests:{active:[],completed:[]},world:{discoveredZones:[],discoveredPOI:[]},tower:{highestFloor:0,weeklyBest:0},guild:null,settings:{music:true,sfx:true,quality:'high'}});
export function createSave(player){return JSON.parse(JSON.stringify({...DEFAULT_SAVE,player}))}
export function migrateSave(save){const source=save||{};return {...DEFAULT_SAVE,...source,version:SAVE_VERSION,inventory:Array.isArray(source.inventory)?source.inventory:[],equipment:source.equipment||{},quests:{...DEFAULT_SAVE.quests,...(source.quests||{})},world:{...DEFAULT_SAVE.world,...(source.world||{})},tower:{...DEFAULT_SAVE.tower,...(source.tower||{})},settings:{...DEFAULT_SAVE.settings,...(source.settings||{})}}}
export function validateSave(save){return Boolean(save&&save.version===SAVE_VERSION&&save.player&&Array.isArray(save.inventory)&&save.equipment)}
