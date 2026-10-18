export const EQUIPMENT_SLOTS = Object.freeze(['Head','Chest','Shoulders','Hands','Legs','Feet','MainHand','OffHand','Neck','Ring1','Ring2','Trinket1','Trinket2']);
export const WEAPON_TYPES = Object.freeze(['Sword','Greatsword','Axe','GreatAxe','Mace','Hammer','Spear','Polearm','Dagger','Bow','Crossbow','Staff','Wand','Shield']);
export const ARMOR_TYPES = Object.freeze(['Cloth','Leather','Mail','Plate']);
export const RARITIES = Object.freeze(['Common','Uncommon','Rare','Epic','Legendary','Mythic','Unique']);

export function canEquip(item = {}, character = {}) {
  if (!item.slot || !EQUIPMENT_SLOTS.includes(item.slot)) return false;
  if (item.level && (character.level ?? 1) < item.level) return false;
  if (item.requiredClass && item.requiredClass !== character.classId) return false;
  if (item.armorType && character.armorType && item.armorType !== character.armorType) return false;
  return true;
}

export function emptyEquipment() {
  return Object.fromEntries(EQUIPMENT_SLOTS.map(slot => [slot, null]));
}
