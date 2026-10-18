export const FANTASY_ASSET_CATALOG = Object.freeze([
  { id:'fighter', category:'classes', name:'Fighter', sheet:'../assets/fantasy/dnd5e-class-emblems.svg', frame:0, description:'Front-line martial hero.' },
  { id:'ranger', category:'classes', name:'Ranger', sheet:'../assets/fantasy/dnd5e-class-emblems.svg', frame:1, description:'Ranged hunter and skirmisher.' },
  { id:'mage', category:'classes', name:'Mage', sheet:'../assets/fantasy/dnd5e-class-emblems.svg', frame:2, description:'Arcane damage and control.' },
  { id:'sword', category:'equipment', name:'Sword', sheet:'../assets/fantasy/dnd5e-equipment.svg', frame:0, description:'One-handed martial weapon.' },
  { id:'shield', category:'equipment', name:'Shield', sheet:'../assets/fantasy/dnd5e-equipment.svg', frame:1, description:'Defensive off-hand equipment.' },
  { id:'armor', category:'equipment', name:'Armor', sheet:'../assets/fantasy/dnd5e-equipment.svg', frame:2, description:'Protective body equipment.' },
  { id:'potion', category:'equipment', name:'Potion', sheet:'../assets/fantasy/dnd5e-equipment.svg', frame:3, description:'Consumable recovery item.' },
  { id:'staff', category:'equipment', name:'Staff', sheet:'../assets/fantasy/dnd5e-equipment.svg', frame:4, description:'Arcane focus weapon.' },
  { id:'goblin', category:'monsters', name:'Goblin', sheet:'../assets/fantasy/dnd5e-monsters.svg', frame:0, description:'Low-tier humanoid enemy.' },
  { id:'orc', category:'monsters', name:'Orc', sheet:'../assets/fantasy/dnd5e-monsters.svg', frame:1, description:'Heavy melee humanoid.' },
  { id:'demon', category:'monsters', name:'Demon', sheet:'../assets/fantasy/dnd5e-monsters.svg', frame:2, description:'High-threat fiend.' },
  { id:'lich', category:'monsters', name:'Lich', sheet:'../assets/fantasy/dnd5e-monsters.svg', frame:3, description:'Undead spellcaster boss.' },
  { id:'dragon', category:'monsters', name:'Dragon', sheet:'../assets/fantasy/dnd5e-monsters.svg', frame:4, description:'World-scale boss encounter.' },
  { id:'forest', category:'biomes', name:'Forest', sheet:'../assets/fantasy/dnd5e-biomes.svg', frame:0, description:'Temperate woodland biome.' },
  { id:'plains', category:'biomes', name:'Plains', sheet:'../assets/fantasy/dnd5e-biomes.svg', frame:1, description:'Open grassland biome.' },
  { id:'frost', category:'biomes', name:'Frost', sheet:'../assets/fantasy/dnd5e-biomes.svg', frame:2, description:'Frozen wilderness biome.' },
  { id:'underdark', category:'biomes', name:'Underdark', sheet:'../assets/fantasy/dnd5e-biomes.svg', frame:3, description:'Deep cavern biome.' },
  { id:'volcanic', category:'biomes', name:'Volcanic', sheet:'../assets/fantasy/dnd5e-biomes.svg', frame:4, description:'Lava and ash biome.' }
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
