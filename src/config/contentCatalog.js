export const BIOMES = Object.freeze([
  { id:'greenfall', name:'Greenfall Forest', level:1, subBiomes:['mosswood','ancient-grove','moonlit-clearing'], hazards:['poison-spores'], dungeons:['rootbound-crypt'] },
  { id:'sunreach', name:'Sunreach Plains', level:5, subBiomes:['golden-meadow','windscar-steppe','watcher-hills'], hazards:['heat'], dungeons:['fallen-bastion'] },
  { id:'ashen', name:'Ashen Wastes', level:15, subBiomes:['ember-fields','glass-desert','cinder-canyon'], hazards:['burning-ground'], dungeons:['molten-vault'] },
  { id:'frostveil', name:'Frostveil Tundra', level:25, subBiomes:['ice-shelf','snowgrave','aurora-ridge'], hazards:['freeze'], dungeons:['frostkeep'] },
  { id:'voidreach', name:'Voidreach', level:40, subBiomes:['fractured-space','void-garden','starless-rift'], hazards:['corruption'], dungeons:['nexus-of-echoes'] },
]);

export const DUNGEONS = Object.freeze([
  { id:'rootbound-crypt', name:'Rootbound Crypt', mode:'dungeon', minLevel:5, bosses:['Crypt Warden'], rooms:8, recommendedParty:3, lootTier:'Rare' },
  { id:'fallen-bastion', name:'Fallen Bastion', mode:'dungeon', minLevel:12, bosses:['Iron Castellan'], rooms:10, recommendedParty:4, lootTier:'Epic' },
  { id:'molten-vault', name:'Molten Vault', mode:'dungeon', minLevel:22, bosses:['Forge Tyrant'], rooms:12, recommendedParty:4, lootTier:'Epic' },
  { id:'frostkeep', name:'Frostkeep', mode:'dungeon', minLevel:32, bosses:['Glacier Queen'], rooms:14, recommendedParty:5, lootTier:'Legendary' },
  { id:'nexus-of-echoes', name:'Nexus of Echoes', mode:'raid', minLevel:45, bosses:['Echo Sovereign'], rooms:20, recommendedParty:10, lootTier:'Mythic' },
]);

export const RAIDS = Object.freeze([
  { id:'skyforge', name:'Skyforge Citadel', minLevel:30, partySize:10, bosses:4, weeklyLockout:true },
  { id:'void-cathedral', name:'Void Cathedral', minLevel:45, partySize:20, bosses:6, weeklyLockout:true },
  { id:'eternity-nexus', name:'Eternity Nexus', minLevel:60, partySize:20, bosses:8, weeklyLockout:true },
]);

export const WORLD_BOSSES = Object.freeze([
  { id:'verdant-titan', name:'Verdant Titan', biome:'greenfall', respawnMinutes:180, level:12 },
  { id:'ash-drake', name:'Ash Drake', biome:'ashen', respawnMinutes:240, level:28 },
  { id:'void-colossus', name:'Void Colossus', biome:'voidreach', respawnMinutes:360, level:50 },
]);

export function getDungeon(id) { return DUNGEONS.find((d) => d.id === id) ?? null; }
export function getBiome(id) { return BIOMES.find((b) => b.id === id) ?? null; }
