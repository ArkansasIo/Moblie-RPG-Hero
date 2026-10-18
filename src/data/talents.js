export const TALENT_TREES = Object.freeze({
  guardian:{name:'Guardian',nodes:[{id:'iron_skin',cost:1,effect:{defense:5}},{id:'shield_mastery',cost:2,effect:{blockChance:4}},{id:'unyielding',cost:3,effect:{maxHealth:120}},{id:'fortress',cost:4,effect:{damageReduction:0.05}}]},
  berserker:{name:'Berserker',nodes:[{id:'rage',cost:1,effect:{attack:6}},{id:'blood_frenzy',cost:2,effect:{criticalChance:3}},{id:'relentless',cost:3,effect:{attackSpeed:0.08}},{id:'war_machine',cost:4,effect:{damageMultiplier:0.1}}]},
  ranger:{name:'Ranger',nodes:[{id:'deadeye',cost:1,effect:{criticalChance:4}},{id:'quick_draw',cost:2,effect:{attackSpeed:0.08}},{id:'hunter_mark',cost:3,effect:{rangedDamage:0.08}},{id:'eagle_eye',cost:4,effect:{criticalDamage:0.2}}]},
  assassin:{name:'Assassin',nodes:[{id:'shadowstep',cost:1,effect:{dodge:4}},{id:'venom',cost:2,effect:{poisonDamage:0.15}},{id:'executioner',cost:3,effect:{executeThreshold:0.08}},{id:'death_from_above',cost:4,effect:{critDamage:0.25}}]},
  cleric:{name:'Cleric',nodes:[{id:'devotion',cost:1,effect:{healingPower:0.06}},{id:'radiance',cost:2,effect:{holyDamage:0.08}},{id:'guardian_angel',cost:3,effect:{revivePower:1}},{id:'divine_aegis',cost:4,effect:{shieldPower:0.12}}]},
  arcanist:{name:'Arcanist',nodes:[{id:'mana_surge',cost:1,effect:{maxMana:50}},{id:'arcane_focus',cost:2,effect:{spellPower:0.08}},{id:'spell_echo',cost:3,effect:{cooldownReduction:0.06}},{id:'apocalypse',cost:4,effect:{areaDamage:0.15}}]}
});
export function getTalentTree(id){return TALENT_TREES[id]||null}
