export const RPG_RULES = {
  ruleset: '5e-inspired original',
  levelCap: 60,
  abilityScores: ['STR','DEX','CON','INT','WIS','CHA'],
  derivedStats: ['HP','AC','AttackBonus','SpellPower','CritChance','Haste','MoveSpeed','Resistances'],
  proficiency: { maxBonus: 6, formula: 'floor((level - 1) / 4) + 2' },
  abilityModifier: 'floor((score - 10) / 2)',
  attackRoll: 'd20 + abilityModifier + proficiency + gearBonus',
  armorClass: '10 + DEX modifier + armorBonus + shieldBonus',
  savingThrow: 'd20 + abilityModifier + proficiencyWhenTrained',
  damage: 'weaponOrSpellDice + abilityModifier + powerBonus',
  critical: 'natural 20 doubles damage dice',
  death: { downedHP: 0, deathChecks: 3, stabilization: 3 },
  conditions: ['Blind','Burning','Chilled','Dazed','Fear','Haste','Poisoned','Rooted','Silenced','Stunned','Taunted','Vulnerable'],
  rarity: ['Common','Uncommon','Rare','Epic','Legendary','Mythic','Ancient','Cosmic'],
  note: 'Uses familiar d20-style mechanics while keeping classes, creatures, names, lore, and implementation original.'
};

export const CLASS_DEFINITIONS = {
  guardian: { name:'Guardian', role:'Tank', primary:'STR', secondary:'CON', resource:'Resolve', armor:['Heavy'], weapons:['Sword','Shield','Mace','Axe'] },
  berserker: { name:'Berserker', role:'Melee DPS', primary:'STR', secondary:'CON', resource:'Rage', armor:['Medium'], weapons:['Axe','Greatsword','Hammer'] },
  ranger: { name:'Ranger', role:'Ranged DPS', primary:'DEX', secondary:'WIS', resource:'Focus', armor:['Light','Medium'], weapons:['Bow','Crossbow','Twin Blades'] },
  arcanist: { name:'Arcanist', role:'Caster DPS', primary:'INT', secondary:'DEX', resource:'Mana', armor:['Cloth'], weapons:['Staff','Wand','Tome'] },
  cleric: { name:'Cleric', role:'Healer', primary:'WIS', secondary:'CON', resource:'Faith', armor:['Medium','Heavy'], weapons:['Mace','Staff','Tome'] },
  rogue: { name:'Rogue', role:'Assassin', primary:'DEX', secondary:'INT', resource:'Energy', armor:['Light'], weapons:['Daggers','Short Sword','Bow'] },
  druid: { name:'Druid', role:'Hybrid', primary:'WIS', secondary:'CON', resource:'Spirit', armor:['Light','Medium'], weapons:['Staff','Spear','Totem'] },
  chronomancer: { name:'Chronomancer', role:'Control', primary:'INT', secondary:'WIS', resource:'Chronos', armor:['Cloth'], weapons:['Orb','Tome','Staff'] },
  artificer: { name:'Artificer', role:'Support DPS', primary:'INT', secondary:'DEX', resource:'Charge', armor:['Medium'], weapons:['Rifle','Hammer','Gadget'] },
  deathKnight: { name:'Death Knight', role:'Tank/DPS', primary:'STR', secondary:'WIL', resource:'Essence', armor:['Heavy'], weapons:['Runeblade','Greatsword','Shield'] },
  summoner: { name:'Summoner', role:'Pet DPS', primary:'INT', secondary:'WIS', resource:'Command', armor:['Cloth'], weapons:['Focus','Staff','Grimoire'] },
  paladin: { name:'Paladin', role:'Tank/Healer', primary:'STR', secondary:'CHA', resource:'Valor', armor:['Heavy'], weapons:['Sword','Shield','Mace'] }
};

export function abilityModifier(score) { return Math.floor((score - 10) / 2); }
export function proficiencyBonus(level) { return Math.min(6, Math.floor((level - 1) / 4) + 2); }
export function attackRoll({ level, abilityScore, gearBonus = 0, trained = true, roll = 10 }) {
  return roll + abilityModifier(abilityScore) + (trained ? proficiencyBonus(level) : 0) + gearBonus;
}
