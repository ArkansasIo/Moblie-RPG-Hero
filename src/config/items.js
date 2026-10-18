export const ITEMS = [
  { id:'weapon_iron_sword', name:'Iron Sword', slot:'MainHand', rarity:'Common', type:'Greatsword', level:1, power:12, stats:{STR:2} },
  { id:'weapon_moon_staff', name:'Moonfire Staff', slot:'MainHand', rarity:'Rare', type:'Staff', level:5, power:38, stats:{INT:6, CritChance:0.03} },
  { id:'weapon_void_bow', name:'Voidpiercer Bow', slot:'MainHand', rarity:'Epic', type:'Bow', level:12, power:84, stats:{DEX:10, CritChance:0.06} },
  { id:'armor_guardian_plate', name:'Guardian Plate', slot:'Chest', rarity:'Rare', type:'Heavy', level:5, power:45, stats:{CON:7, Armor:24} },
  { id:'armor_shadow_cloak', name:'Shadowweave Cloak', slot:'Cloak', rarity:'Epic', type:'Light', level:12, power:78, stats:{DEX:8, CDR:0.04} },
  { id:'ring_arcane', name:'Arcane Loop', slot:'Ring1', rarity:'Rare', type:'Ring', level:7, power:32, stats:{INT:5, CritDamage:0.08} },
  { id:'relic_aether_core', name:'Aether Core', slot:'Trinket1', rarity:'Legendary', type:'Relic', level:20, power:160, stats:{SPI:12, WIL:8, CDR:0.08} },
  { id:'consumable_red_potion', name:'Greater Health Potion', slot:null, rarity:'Uncommon', type:'Consumable', level:1, power:0, effect:{healPercent:0.30}, stackMax:20 },
  { id:'material_iron_ore', name:'Iron Ore', slot:null, rarity:'Common', type:'Material', level:1, power:0, stackMax:999 },
  { id:'material_void_shard', name:'Void Shard', slot:null, rarity:'Epic', type:'Material', level:20, power:0, stackMax:99 },
  { id:'gem_ruby', name:'Flawless Ruby', slot:null, rarity:'Rare', type:'Gem', level:10, power:20, stats:{STR:4} },
  { id:'gem_sapphire', name:'Flawless Sapphire', slot:null, rarity:'Rare', type:'Gem', level:10, power:20, stats:{INT:4} },
  { id:'gem_emerald', name:'Flawless Emerald', slot:null, rarity:'Rare', type:'Gem', level:10, power:20, stats:{DEX:4} },
];

export const ITEM_RARITY_COLORS = Object.freeze({
  Common:'#aeb7c2', Uncommon:'#54d46f', Rare:'#4fa7ff', Epic:'#bd6cff', Legendary:'#ffb52e', Mythic:'#ff5e5e', Ascended:'#7df8ff'
});
