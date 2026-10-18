// Scalable MMORPG world content. Character level and world tier are independent.
export const WORLD_TIERS = Object.freeze(Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: `World Tier ${i + 1}`,
  enemyHealthMultiplier: Number((1 + i * 0.35).toFixed(2)),
  enemyDamageMultiplier: Number((1 + i * 0.3).toFixed(2)),
  lootMultiplier: Number((1 + i * 0.18).toFixed(2)),
  recommendedLevel: Math.min(720, 1 + i * 90)
})));

export const WORLD_BIOMES = Object.freeze([
  { id: 'greenwilds', name: 'Greenwilds', climate: 'temperate', subBiomes: ['deep-forest','sunlit-grove','moss-marsh','ancient-wood'] },
  { id: 'sunplains', name: 'Sun Plains', climate: 'temperate-dry', subBiomes: ['grassland','golden-steppe','wind-valley','ruined-fields'] },
  { id: 'ashen-desert', name: 'Ashen Desert', climate: 'arid', subBiomes: ['red-dunes','glass-wastes','oasis','buried-city'] },
  { id: 'frostcrown', name: 'Frostcrown', climate: 'polar', subBiomes: ['snowfield','ice-caves','glacier','frozen-fortress'] },
  { id: 'murkfen', name: 'Murkfen', climate: 'wetland', subBiomes: ['bog','reed-marsh','fungal-grotto','drowned-ruins'] },
  { id: 'emberreach', name: 'Emberreach', climate: 'volcanic', subBiomes: ['lava-field','obsidian-ridge','cinderwood','fire-cavern'] },
  { id: 'stormcoast', name: 'Storm Coast', climate: 'oceanic', subBiomes: ['cliffshore','tidal-caves','island-chain','tempest-sea'] },
  { id: 'aethermoor', name: 'Aethermoor', climate: 'arcane', subBiomes: ['mana-grove','floating-isles','crystal-valley','astral-ruins'] },
  { id: 'voidscar', name: 'Voidscar', climate: 'void', subBiomes: ['void-rift','blackstone','starless-wastes','paradox-zone'] }
]);

export const WORLD_ZONES = Object.freeze([
  { id:'thornwatch', name:'Thornwatch Frontier', biome:'greenwilds', level:[1,60], subZones:['Mossgate','Briarwood','Old Watchtower','Wolfrun'] },
  { id:'goldenroad', name:'Goldenroad', biome:'sunplains', level:[40,120], subZones:['Windmill Downs','Sunspire Road','Bandit Vale','Hearthfield'] },
  { id:'dunesea', name:'Dunesea', biome:'ashen-desert', level:[90,200], subZones:['Scorch Dunes','Glass Basin','Mirage Oasis','Buried Crown'] },
  { id:'frostmarch', name:'Frostmarch', biome:'frostcrown', level:[150,280], subZones:['Whitepine','Icefang Pass','Crown Glacier','Stormhold'] },
  { id:'blackfen', name:'Blackfen', biome:'murkfen', level:[230,360], subZones:['Rotwater','Sporegrove','Drowned Chapel','Bogheart'] },
  { id:'emberfall', name:'Emberfall', biome:'emberreach', level:[310,450], subZones:['Cinderplain','Obsidian Gate','Magma Steps','Dragonforge'] },
  { id:'tempest-isles', name:'Tempest Isles', biome:'stormcoast', level:[400,540], subZones:['Galeport','Thunder Reef','Maelstrom Trench','Skywreck'] },
  { id:'aether-crown', name:'Aether Crown', biome:'aethermoor', level:[500,630], subZones:['Mana Gardens','Crystal Spires','Astral Bridge','Celestial Archive'] },
  { id:'voidscar', name:'Voidscar', biome:'voidscar', level:[600,720], subZones:['Riftlands','Black Citadel','Starless Basin','Paradox Gate'] }
]);

export const DUNGEONS = Object.freeze([
  { id:'thorncrypt', name:'Thorn Crypt', tier:'normal', level:[30,75], biome:'greenwilds', bosses:['Crypt Warden'], mechanics:['poison','root','crypt traps'] },
  { id:'sunken-temple', name:'Sunken Temple', tier:'normal', level:[75,140], biome:'murkfen', bosses:['Drowned Oracle'], mechanics:['water level','silence','flood'] },
  { id:'glass-catacombs', name:'Glass Catacombs', tier:'heroic', level:[140,240], biome:'ashen-desert', bosses:['Sand Revenant'], mechanics:['mirrors','sandstorm','burrow'] },
  { id:'frostkeep', name:'Frostkeep', tier:'heroic', level:[220,330], biome:'frostcrown', bosses:['Ice Castellan'], mechanics:['freeze','ice walls','blizzard'] },
  { id:'dragonforge', name:'Dragonforge', tier:'mythic', level:[320,460], biome:'emberreach', bosses:['Forge Tyrant','Elder Drake'], mechanics:['lava','overheat','forge adds'] },
  { id:'astral-archive', name:'Astral Archive', tier:'mythic', level:[480,620], biome:'aethermoor', bosses:['Archivist Prime'], mechanics:['gravity','spell reflection','memory orbs'] },
  { id:'paradox-gate', name:'Paradox Gate', tier:'mythic', level:[600,720], biome:'voidscar', bosses:['Paradox Knight','The Null King'], mechanics:['time reversal','duplicate players','reality collapse'] }
]);

export const TRAILS = Object.freeze([
  { id:'wolfrun-trail', name:'Wolfrun Trail', level:[20,60], biome:'greenwilds', checkpoints:6, reward:'Trail Cache I' },
  { id:'dune-trail', name:'Mirage Trail', level:[100,180], biome:'ashen-desert', checkpoints:8, reward:'Trail Cache II' },
  { id:'glacier-trail', name:'Glacier Ascent', level:[220,320], biome:'frostcrown', checkpoints:10, reward:'Trail Cache III' },
  { id:'storm-trail', name:'Stormrunner Trail', level:[400,540], biome:'stormcoast', checkpoints:12, reward:'Trail Cache IV' },
  { id:'void-trail', name:'Voidwalker Trail', level:[600,720], biome:'voidscar', checkpoints:15, reward:'Trail Cache V' }
]);

export const RAIDS = Object.freeze([
  { id:'citadel-of-ashes', name:'Citadel of Ashes', level:[360,440], players:'8-12', bosses:['Ash General','Cinder Queen','Volcanic Colossus'], wings:3, lockout:'weekly' },
  { id:'skyfall-sanctum', name:'Skyfall Sanctum', level:[500,620], players:'10-16', bosses:['Storm Seraph','Aether Engine','Skyfall Sovereign'], wings:4, lockout:'weekly' },
  { id:'end-of-stars', name:'End of Stars', level:[640,720], players:'12-20', bosses:['Void Herald','Paradox Trinity','The Endbringer'], wings:5, lockout:'weekly' }
]);

export const TOWER_FLOORS = Object.freeze(Array.from({ length: 100 }, (_, index) => {
  const floor = index + 1;
  const tier = Math.ceil(floor / 10);
  const boss = floor % 10 === 0;
  const themes = ['Forest','Stone','Desert','Frost','Swamp','Volcanic','Storm','Arcane','Void','Paradox'];
  return { floor, tier, name:`${themes[tier-1]} Tower — Floor ${floor}`, level:Math.min(720, floor * 7), type:boss ? 'boss' : floor % 5 === 0 ? 'elite' : 'combat', biome:WORLD_BIOMES[Math.min(tier-1,8)].id, objective:boss ? 'Defeat the floor guardian' : 'Clear the floor', rewards:boss ? ['Tower Key','Boss Cache','Mastery XP'] : ['Tower Gold','Gear Cache','Tower XP'] };
}));

export const WORLD_CONTENT = Object.freeze({
  pointsOfInterest:['Town','Camp','Shrine','Dungeon Entrance','Raid Entrance','World Boss Arena','Resource Node','Hidden Passage','Portal','Faction Outpost'],
  worldBosses:['Ancient Treant','Sand Wyrm','Frost Colossus','Inferno Dragon','Storm Leviathan','Astral Titan','Void Titan'],
  events:['Rift Invasion','Monster Hunt','Resource Rush','World Defense','Escort','Treasure Storm','Faction War'],
  gathering:['Mining','Logging','Herbalism','Skinning','Fishing','Archaeology','Crystal Harvesting'],
  travel:['Fast Travel','Mounts','Flight Paths','Portals','Boats','Teleport Stones']
});

export function getZoneForLevel(level) { const l=Number(level)||1; return WORLD_ZONES.find(z=>l>=z.level[0]&&l<=z.level[1]) ?? WORLD_ZONES.at(-1); }
export function getBiome(id) { return WORLD_BIOMES.find(b=>b.id===id) ?? WORLD_BIOMES[0]; }
