// Taskbar Hero world, dungeon, raid, tower, zone and biome data.
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
  { id: 'thornwatch', name: 'Thornwatch Frontier', biome: 'greenwilds', level: [1,10], subZones: ['Mossgate','Briarwood','Old Watchtower','Wolfrun'] },
  { id: 'goldenroad', name: 'Goldenroad', biome: 'sunplains', level: [8,18], subZones: ['Windmill Downs','Sunspire Road','Bandit Vale','Hearthfield'] },
  { id: 'dunesea', name: 'Dunesea', biome: 'ashen-desert', level: [18,30], subZones: ['Scorch Dunes','Glass Basin','Mirage Oasis','Buried Crown'] },
  { id: 'frostmarch', name: 'Frostmarch', biome: 'frostcrown', level: [28,42], subZones: ['Whitepine','Icefang Pass','Crown Glacier','Stormhold'] },
  { id: 'blackfen', name: 'Blackfen', biome: 'murkfen', level: [38,52], subZones: ['Rotwater','Sporegrove','Drowned Chapel','Bogheart'] },
  { id: 'emberfall', name: 'Emberfall', biome: 'emberreach', level: [48,62], subZones: ['Cinderplain','Obsidian Gate','Magma Steps','Dragonforge'] },
  { id: 'tempest-isles', name: 'Tempest Isles', biome: 'stormcoast', level: [58,72], subZones: ['Galeport','Thunder Reef','Maelstrom Trench','Skywreck'] },
  { id: 'aether-crown', name: 'Aether Crown', biome: 'aethermoor', level: [68,82], subZones: ['Mana Gardens','Crystal Spires','Astral Bridge','Celestial Archive'] },
  { id: 'voidscar', name: 'Voidscar', biome: 'voidscar', level: [80,100], subZones: ['Riftlands','Black Citadel','Starless Basin','Paradox Gate'] }
]);

export const DUNGEONS = Object.freeze([
  { id:'thorncrypt', name:'Thorn Crypt', tier:'normal', level:[8,12], biome:'greenwilds', bosses:['Crypt Warden'], mechanics:['poison','root','crypt traps'] },
  { id:'sunken-temple', name:'Sunken Temple', tier:'normal', level:[18,24], biome:'murkfen', bosses:['Drowned Oracle'], mechanics:['water level','silence','flood'] },
  { id:'glass-catacombs', name:'Glass Catacombs', tier:'heroic', level:[30,38], biome:'ashen-desert', bosses:['Sand Revenant'], mechanics:['mirrors','sandstorm','burrow'] },
  { id:'frostkeep', name:'Frostkeep', tier:'heroic', level:[42,50], biome:'frostcrown', bosses:['Ice Castellan'], mechanics:['freeze','ice walls','blizzard'] },
  { id:'dragonforge', name:'Dragonforge', tier:'mythic', level:[55,65], biome:'emberreach', bosses:['Forge Tyrant','Elder Drake'], mechanics:['lava','overheat','forge adds'] },
  { id:'astral-archive', name:'Astral Archive', tier:'mythic', level:[72,82], biome:'aethermoor', bosses:['Archivist Prime'], mechanics:['gravity','spell reflection','memory orbs'] },
  { id:'paradox-gate', name:'Paradox Gate', tier:'mythic', level:[88,100], biome:'voidscar', bosses:['Paradox Knight','The Null King'], mechanics:['time reversal','duplicate players','reality collapse'] }
]);

export const TRAILS = Object.freeze([
  { id:'wolfrun-trail', name:'Wolfrun Trail', level:[4,8], biome:'greenwilds', checkpoints:6, reward:'Trail Cache I' },
  { id:'dune-trail', name:'Mirage Trail', level:[20,28], biome:'ashen-desert', checkpoints:8, reward:'Trail Cache II' },
  { id:'glacier-trail', name:'Glacier Ascent', level:[35,45], biome:'frostcrown', checkpoints:10, reward:'Trail Cache III' },
  { id:'storm-trail', name:'Stormrunner Trail', level:[55,70], biome:'stormcoast', checkpoints:12, reward:'Trail Cache IV' },
  { id:'void-trail', name:'Voidwalker Trail', level:[80,100], biome:'voidscar', checkpoints:15, reward:'Trail Cache V' }
]);

export const RAIDS = Object.freeze([
  { id:'citadel-of-ashes', name:'Citadel of Ashes', level:[55,65], players:'8-12', bosses:['Ash General','Cinder Queen','Volcanic Colossus'], wings:3, lockout:'weekly' },
  { id:'skyfall-sanctum', name:'Skyfall Sanctum', level:[70,82], players:'10-16', bosses:['Storm Seraph','Aether Engine','Skyfall Sovereign'], wings:4, lockout:'weekly' },
  { id:'end-of-stars', name:'End of Stars', level:[90,100], players:'12-20', bosses:['Void Herald','Paradox Trinity','The Endbringer'], wings:5, lockout:'weekly' }
]);

export const TOWER_FLOORS = Object.freeze(Array.from({ length: 100 }, (_, index) => {
  const floor = index + 1;
  const tier = Math.ceil(floor / 10);
  const boss = floor % 10 === 0;
  const themes = ['Forest','Stone','Desert','Frost','Swamp','Volcanic','Storm','Arcane','Void','Paradox'];
  return {
    floor,
    tier,
    name: `${themes[tier - 1]} Tower — Floor ${floor}`,
    level: Math.max(1, floor),
    type: boss ? 'boss' : floor % 5 === 0 ? 'elite' : 'combat',
    biome: ['greenwilds','sunplains','ashen-desert','frostcrown','murkfen','emberreach','stormcoast','aethermoor','voidscar','voidscar'][Math.min(tier - 1,9)],
    objective: boss ? 'Defeat the floor guardian' : floor % 3 === 0 ? 'Clear all waves' : floor % 3 === 1 ? 'Reach the exit' : 'Defeat the elite group',
    rewards: boss ? ['Tower Key','Boss Cache','Mastery XP'] : ['Tower Gold','Gear Cache','Tower XP']
  };
}));

export const WORLD_CONTENT = Object.freeze({
  pointsOfInterest: ['Town','Camp','Shrine','Dungeon Entrance','Raid Entrance','World Boss Arena','Resource Node','Hidden Passage','Portal','Faction Outpost'],
  worldBosses: ['Ancient Treant','Sand Wyrm','Frost Colossus','Inferno Dragon','Storm Leviathan','Astral Titan','Void Titan'],
  events: ['Rift Invasion','Monster Hunt','Resource Rush','World Defense','Escort','Treasure Storm','Faction War'],
  gathering: ['Mining','Logging','Herbalism','Skinning','Fishing','Archaeology','Crystal Harvesting'],
  travel: ['Fast Travel','Mounts','Flight Paths','Portals','Boats','Teleport Stones']
});
