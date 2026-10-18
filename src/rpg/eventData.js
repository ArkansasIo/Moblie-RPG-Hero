export const WORLD_EVENTS = Object.freeze([
  { id:'rift-invasion', name:'Rift Invasion', durationMinutes:30, reward:'rift-shards' },
  { id:'monster-hunt', name:'Monster Hunt', durationMinutes:45, reward:'boss-materials' },
  { id:'resource-rush', name:'Resource Rush', durationMinutes:60, reward:'gathering-bonus' },
  { id:'world-defense', name:'World Defense', durationMinutes:30, reward:'defense-cache' },
  { id:'treasure-storm', name:'Treasure Storm', durationMinutes:20, reward:'treasure-chests' },
  { id:'faction-war', name:'Faction War', durationMinutes:120, reward:'faction-tokens' }
]);

export const WORLD_BOSSES = Object.freeze([
  { id:'ancient-treant', name:'Ancient Treant', level:15, respawnMinutes:180 },
  { id:'sand-wyrm', name:'Sand Wyrm', level:30, respawnMinutes:240 },
  { id:'frost-colossus', name:'Frost Colossus', level:45, respawnMinutes:300 },
  { id:'inferno-dragon', name:'Inferno Dragon', level:60, respawnMinutes:360 },
  { id:'storm-leviathan', name:'Storm Leviathan', level:72, respawnMinutes:360 },
  { id:'astral-titan', name:'Astral Titan', level:85, respawnMinutes:480 },
  { id:'void-titan', name:'Void Titan', level:100, respawnMinutes:720 }
]);
