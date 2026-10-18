export const WORLD_ZONES = Object.freeze([
  { id:'thornwatch', name:'Thornwatch Frontier', minLevel:1, maxLevel:10, biome:'greenfall', subZones:['mossgate','briarwood','old-watchtower','wolfrun'] },
  { id:'goldenroad', name:'Goldenroad', minLevel:8, maxLevel:18, biome:'sunreach', subZones:['windmill-downs','sunspire-road','bandit-vale','hearthfield'] },
  { id:'dunesea', name:'Dunesea', minLevel:18, maxLevel:30, biome:'ashen', subZones:['scorch-dunes','glass-basin','mirage-oasis','buried-crown'] },
  { id:'frostmarch', name:'Frostmarch', minLevel:28, maxLevel:42, biome:'frostveil', subZones:['whitepine','icefang-pass','crown-glacier','stormhold'] },
  { id:'blackfen', name:'Blackfen', minLevel:38, maxLevel:52, biome:'greenfall', subZones:['rotwater','sporegrove','drowned-chapel','bogheart'] },
  { id:'emberfall', name:'Emberfall', minLevel:48, maxLevel:62, biome:'ashen', subZones:['cinderplain','obsidian-gate','magma-steps','dragonforge'] },
  { id:'tempest-isles', name:'Tempest Isles', minLevel:58, maxLevel:72, biome:'storm', subZones:['galeport','thunder-reef','maelstrom-trench','skywreck'] },
  { id:'aether-crown', name:'Aether Crown', minLevel:68, maxLevel:82, biome:'aether', subZones:['mana-gardens','crystal-spires','astral-bridge','celestial-archive'] },
  { id:'voidscar', name:'Voidscar', minLevel:80, maxLevel:100, biome:'voidreach', subZones:['riftlands','black-citadel','starless-basin','paradox-gate'] }
]);

export const TRAILS = Object.freeze([
  { id:'wolfrun-trail', name:'Wolfrun Trail', minLevel:4, zone:'thornwatch', encounters:8 },
  { id:'mirage-trail', name:'Mirage Trail', minLevel:20, zone:'dunesea', encounters:10 },
  { id:'glacier-ascent', name:'Glacier Ascent', minLevel:32, zone:'frostmarch', encounters:12 },
  { id:'stormrunner-trail', name:'Stormrunner Trail', minLevel:60, zone:'tempest-isles', encounters:15 },
  { id:'voidwalker-trail', name:'Voidwalker Trail', minLevel:82, zone:'voidscar', encounters:20 }
]);

export function getZone(id) { return WORLD_ZONES.find(z => z.id === id) ?? null; }
export function canEnterZone(id, level) { const z = getZone(id); return Boolean(z && level >= z.minLevel && level <= z.maxLevel + 10); }
