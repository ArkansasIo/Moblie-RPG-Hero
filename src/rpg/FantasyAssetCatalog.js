export const FANTASY_ASSET_CATALOG = Object.freeze([
  { id:'fighter', category:'classes', name:'Fighter', sheet:'../assets/fantasy/dnd5e-classes-v2.svg', frame:0, description:'Front-line martial hero.' },
  { id:'ranger', category:'classes', name:'Ranger', sheet:'../assets/fantasy/dnd5e-classes-v2.svg', frame:1, description:'Ranged hunter and skirmisher.' },
  { id:'mage', category:'classes', name:'Mage', sheet:'../assets/fantasy/dnd5e-classes-v2.svg', frame:2, description:'Arcane damage and control.' },
  { id:'cleric', category:'classes', name:'Cleric', sheet:'../assets/fantasy/dnd5e-classes-v2.svg', frame:3, description:'Divine support and healing.' },
  { id:'rogue', category:'classes', name:'Rogue', sheet:'../assets/fantasy/dnd5e-classes-v2.svg', frame:4, description:'Agile stealth and burst damage.' },
  { id:'sword', category:'equipment', name:'Blade', sheet:'../assets/fantasy/dnd5e-equipment-v2.svg', frame:0, description:'One-handed martial weapon.' },
  { id:'bow', category:'equipment', name:'Bow', sheet:'../assets/fantasy/dnd5e-equipment-v2.svg', frame:1, description:'Ranged martial weapon.' },
  { id:'armor', category:'equipment', name:'Armor', sheet:'../assets/fantasy/dnd5e-equipment-v2.svg', frame:2, description:'Protective body equipment.' },
  { id:'potion', category:'equipment', name:'Potion', sheet:'../assets/fantasy/dnd5e-equipment-v2.svg', frame:3, description:'Consumable recovery item.' },
  { id:'relic', category:'equipment', name:'Relic', sheet:'../assets/fantasy/dnd5e-equipment-v2.svg', frame:4, description:'Rare magical artifact.' },
  { id:'goblin', category:'monsters', name:'Goblin', sheet:'../assets/fantasy/dnd5e-monsters-v2.svg', frame:0, description:'Low-tier humanoid enemy.' },
  { id:'orc', category:'monsters', name:'Orc', sheet:'../assets/fantasy/dnd5e-monsters-v2.svg', frame:1, description:'Heavy melee humanoid.' },
  { id:'demon', category:'monsters', name:'Demon', sheet:'../assets/fantasy/dnd5e-monsters-v2.svg', frame:2, description:'High-threat fiend.' },
  { id:'lich', category:'monsters', name:'Lich', sheet:'../assets/fantasy/dnd5e-monsters-v2.svg', frame:3, description:'Undead spellcaster boss.' },
  { id:'dragon', category:'monsters', name:'Dragon', sheet:'../assets/fantasy/dnd5e-monsters-v2.svg', frame:4, description:'World-scale boss encounter.' },
  { id:'forest', category:'biomes', name:'Forest', sheet:'../assets/fantasy/dnd5e-biomes-v2.svg', frame:0, description:'Temperate woodland biome.' },
  { id:'plains', category:'biomes', name:'Plains', sheet:'../assets/fantasy/dnd5e-biomes-v2.svg', frame:1, description:'Open grassland biome.' },
  { id:'frost', category:'biomes', name:'Frost', sheet:'../assets/fantasy/dnd5e-biomes-v2.svg', frame:2, description:'Frozen wilderness biome.' },
  { id:'underdark', category:'biomes', name:'Underdark', sheet:'../assets/fantasy/dnd5e-biomes-v2.svg', frame:3, description:'Deep cavern biome.' },
  { id:'volcanic', category:'biomes', name:'Volcanic', sheet:'../assets/fantasy/dnd5e-biomes-v2.svg', frame:4, description:'Lava and ash biome.' },
  { id:'map', category:'ui', name:'Map', sheet:'../assets/fantasy/dnd5e-ui-icons-v2.svg', frame:0, description:'World navigation command icon.' },
  { id:'quest', category:'ui', name:'Quest', sheet:'../assets/fantasy/dnd5e-ui-icons-v2.svg', frame:1, description:'Quest journal command icon.' },
  { id:'inventory', category:'ui', name:'Inventory', sheet:'../assets/fantasy/dnd5e-ui-icons-v2.svg', frame:2, description:'Inventory command icon.' },
  { id:'craft', category:'ui', name:'Craft', sheet:'../assets/fantasy/dnd5e-ui-icons-v2.svg', frame:3, description:'Crafting command icon.' },
  { id:'portal', category:'ui', name:'Portal', sheet:'../assets/fantasy/dnd5e-ui-icons-v2.svg', frame:4, description:'Travel and portal command icon.' }
]);

export function getFantasyAsset(id) {
  return FANTASY_ASSET_CATALOG.find((asset) => asset.id === id) ?? null;
}

export function getFantasyAssets(category) {
  return FANTASY_ASSET_CATALOG.filter((asset) => asset.category === category);
}

export function getFantasyCategories() {
  return [...new Set(FANTASY_ASSET_CATALOG.map((asset) => asset.category))];
}
