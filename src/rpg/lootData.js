export const RARITIES = Object.freeze(['common','uncommon','rare','epic','legendary','mythic','ancient','unique']);
export const EQUIPMENT_SLOTS = Object.freeze(['head','shoulders','chest','hands','legs','feet','mainHand','offHand','neck','ring1','ring2','relic','artifact']);

export const ITEM_AFFIXES = Object.freeze([
  {id:'of-might',stat:'strength',min:1,max:10},{id:'of-precision',stat:'dexterity',min:1,max:10},
  {id:'of-vitality',stat:'vitality',min:1,max:12},{id:'of-intellect',stat:'intelligence',min:1,max:12},
  {id:'of-warding',stat:'armor',min:1,max:15},{id:'of-the-flame',stat:'firePower',min:1,max:12},
  {id:'of-the-void',stat:'voidPower',min:1,max:12},{id:'of-rapidity',stat:'haste',min:1,max:8},
  {id:'of-precision',stat:'crit',min:1,max:8},{id:'of-mending',stat:'healingPower',min:1,max:12}
]);

export function itemPower(level, rarityIndex=0) { return Math.floor(Math.pow(Math.max(1,level),1.12) * (1 + rarityIndex*0.22)); }
export function rollItem(level, rarityIndex=0, slot='chest') { const rarity=RARITIES[Math.max(0,Math.min(RARITIES.length-1,rarityIndex))]; return {id:`loot-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,slot,rarity,level,power:itemPower(level,rarityIndex),affixes:Math.min(6,1+rarityIndex)}; }
