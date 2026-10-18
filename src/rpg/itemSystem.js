// Data-driven RPG equipment, inventory, crafting and loot systems.
export const WEAPONS = Object.freeze([
  { id:'iron-sword', name:'Iron Sword', slot:'mainhand', type:'sword', rarity:'common', level:1, stats:{str:3,attack:8}, sockets:0 },
  { id:'moonfire-staff', name:'Moonfire Staff', slot:'mainhand', type:'staff', rarity:'rare', level:12, stats:{int:8,spellPower:18}, sockets:1 },
  { id:'voidpiercer-bow', name:'Voidpiercer Bow', slot:'mainhand', type:'bow', rarity:'epic', level:35, stats:{dex:15,attack:42,crit:5}, sockets:2 },
  { id:'dragonfang', name:'Dragonfang', slot:'mainhand', type:'greatsword', rarity:'legendary', level:65, stats:{str:28,attack:110,crit:8}, sockets:3 },
  { id:'paradox-edge', name:'Paradox Edge', slot:'mainhand', type:'relic-blade', rarity:'mythic', level:90, stats:{str:35,dex:35,attack:220,crit:12}, sockets:4 }
]);

export const ARMOR = Object.freeze([
  { id:'guardian-plate', name:'Guardian Plate', slot:'chest', type:'heavy', rarity:'rare', level:20, stats:{vit:12,armor:45}, set:'Guardian' },
  { id:'shadowweave-cloak', name:'Shadowweave Cloak', slot:'chest', type:'cloth', rarity:'epic', level:40, stats:{dex:15,int:10,armor:32}, set:'Shadowweave' },
  { id:'frostguard-mail', name:'Frostguard Mail', slot:'chest', type:'medium', rarity:'epic', level:45, stats:{con:18,vit:18,armor:70}, set:'Frostguard' },
  { id:'dragonforged-plate', name:'Dragonforged Plate', slot:'chest', type:'heavy', rarity:'legendary', level:65, stats:{str:22,con:24,vit:30,armor:125,fireResist:15}, set:'Dragonforged' },
  { id:'aether-regalia', name:'Aether Regalia', slot:'chest', type:'cloth', rarity:'mythic', level:90, stats:{int:35,wis:30,spi:20,armor:95,spellPower:140}, set:'Aether' }
]);

export const EQUIPMENT = Object.freeze([
  { id:'arcane-loop', name:'Arcane Loop', slot:'ring', rarity:'epic', level:30, stats:{int:12,crit:3,spellPower:20} },
  { id:'aether-core', name:'Aether Core', slot:'relic', rarity:'legendary', level:60, stats:{allAttributes:8,haste:5,mastery:12} },
  { id:'void-heart', name:'Void Heart', slot:'relic', rarity:'mythic', level:90, stats:{allAttributes:15,damage:20,crit:10,voidResist:25} },
  { id:'iron-buckler', name:'Iron Buckler', slot:'offhand', rarity:'common', level:1, stats:{armor:12,block:8} },
  { id:'dragonshield', name:'Dragonshield', slot:'offhand', rarity:'legendary', level:65, stats:{armor:90,block:25,fireResist:20} }
]);

export const INVENTORY_RULES = Object.freeze({
  bagSlots: 60,
  bankSlots: 200,
  equipmentSlots: ['head','neck','shoulders','chest','back','hands','waist','legs','feet','mainhand','offhand','ring1','ring2','trinket','relic'],
  stackable: ['materials','consumables','quest-items','currency'],
  binding: ['bind-on-pickup','bind-on-equip','unbound'],
  currencies: ['gold','premium','honor','arena','guild','event','crafting-tokens']
});

export const CONSUMABLES = Object.freeze([
  { id:'health-potion', name:'Greater Health Potion', type:'potion', effect:'restore-health', value:35, stack:20 },
  { id:'mana-potion', name:'Greater Mana Potion', type:'potion', effect:'restore-mana', value:35, stack:20 },
  { id:'elixir-of-power', name:'Elixir of Power', type:'elixir', effect:'attack-buff', value:15, duration:1800, stack:10 },
  { id:'camp-kit', name:'Adventurer Camp Kit', type:'utility', effect:'checkpoint', stack:5 }
]);

export const MATERIALS = Object.freeze([
  'Iron Ore','Moonstone','Void Shard','Dragon Scale','Ancient Wood','Frost Crystal','Storm Pearl','Aether Crystal','Leather','Monster Core','Arcane Dust','Flawless Ruby','Flawless Sapphire','Flawless Emerald'
]);

export const CRAFTING_PROFESSIONS = Object.freeze([
  {id:'blacksmithing', name:'Blacksmithing', recipes:['weapons','heavy-armor','shields']},
  {id:'armoring', name:'Armoring', recipes:['medium-armor','cloth-armor']},
  {id:'leatherworking', name:'Leatherworking', recipes:['leather-armor','bows','bags']},
  {id:'alchemy', name:'Alchemy', recipes:['potions','elixirs','flasks']},
  {id:'enchanting', name:'Enchanting', recipes:['enchants','runes','relics']},
  {id:'jewelcrafting', name:'Jewelcrafting', recipes:['rings','gems','amulets']}
]);

export const LOOT_RULES = Object.freeze({
  rarityWeights:{common:60,uncommon:25,rare:10,epic:4,legendary:0.9,mythic:0.1},
  dungeonBonus:1.2,
  raidBonus:2.5,
  towerBossBonus:1.8,
  pityCounter:{epic:25,legendary:100,mythic:500},
  personalLoot:true,
  groupLoot:['personal','need-greed','master-loot-disabled']
});

export function calculateGearScore(items = []) {
  return items.reduce((score, item) => score + (item?.level || 0) * ({common:1,uncommon:1.2,rare:1.5,epic:2,legendary:2.7,mythic:3.5}[item?.rarity] || 1), 0);
}

export function calculateInventoryWeight(items = []) {
  return items.reduce((weight, item) => weight + ((item?.weight || 1) * (item?.quantity || 1)), 0);
}

export function rollLoot(seed, table = LOOT_RULES.rarityWeights) {
  let value = Math.abs(Number(seed) || 1) % 10000 / 100;
  let cursor = 0;
  for (const [rarity, weight] of Object.entries(table)) { cursor += weight; if (value < cursor) return rarity; }
  return 'common';
}
