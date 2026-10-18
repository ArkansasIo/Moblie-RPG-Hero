import { BIOMES } from './biomes.js';
import { WORLD_MAP } from './maps.js';
import { MATERIALS } from './materials.js';
import { NPCS } from './npcs.js';
import { STATUS_EFFECTS } from './statusEffects.js';
import { TALENT_TREES } from './talents.js';
import { ACHIEVEMENTS } from './achievements.js';
import { LOOT_TABLES } from './lootTables.js';
import { DUNGEON_ENCOUNTERS, RAID_RULES } from './dungeonRaidData.js';
import { TOWER } from './tower.js';
import { ZONE_CONTENT } from './zones.js';

export const CONTENT_REGISTRY=Object.freeze({biomes:BIOMES,zones:ZONE_CONTENT,maps:WORLD_MAP,materials:MATERIALS,npcs:NPCS,statusEffects:STATUS_EFFECTS,talents:TALENT_TREES,achievements:ACHIEVEMENTS,lootTables:LOOT_TABLES,dungeons:DUNGEON_ENCOUNTERS,raids:RAID_RULES,tower:TOWER});
export function contentStats(){return Object.fromEntries(Object.entries(CONTENT_REGISTRY).map(([key,value])=>[key,Array.isArray(value)?value.length:Object.keys(value).length]))}
export function hasContent(type,id){const group=CONTENT_REGISTRY[type];if(!group)return false;return Array.isArray(group)?group.some(x=>x.id===id):Boolean(group[id])}
export function validateContentRegistry(){return Object.values(CONTENT_REGISTRY).every(Boolean)}
