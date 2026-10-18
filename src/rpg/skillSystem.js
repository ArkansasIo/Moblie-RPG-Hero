export const SKILL_TYPES = Object.freeze(['active','passive','ultimate','utility']);
export const DAMAGE_TYPES = Object.freeze(['physical','fire','frost','lightning','nature','arcane','shadow','void','holy']);

export const SKILLS = Object.freeze([
  { id:'warrior-slash', name:'Power Slash', class:'Warrior', type:'active', damageType:'physical', power:1.2, cooldown:2, resource:10 },
  { id:'warrior-guard', name:'Iron Guard', class:'Warrior', type:'active', damageType:'physical', power:0, cooldown:20, resource:25 },
  { id:'knight-shield-wall', name:'Shield Wall', class:'Knight', type:'active', damageType:'physical', power:0, cooldown:60, resource:30 },
  { id:'rogue-backstab', name:'Backstab', class:'Rogue', type:'active', damageType:'physical', power:2.0, cooldown:4, resource:15 },
  { id:'ranger-aimed-shot', name:'Aimed Shot', class:'Ranger', type:'active', damageType:'physical', power:1.8, cooldown:5, resource:12 },
  { id:'mage-fireball', name:'Fireball', class:'Mage', type:'active', damageType:'fire', power:1.6, cooldown:3, resource:20 },
  { id:'elementalist-frost-nova', name:'Frost Nova', class:'Elementalist', type:'active', damageType:'frost', power:1.3, cooldown:12, resource:28 },
  { id:'cleric-holy-light', name:'Holy Light', class:'Cleric', type:'active', damageType:'holy', power:1.5, cooldown:2, resource:18 },
  { id:'paladin-divine-shield', name:'Divine Shield', class:'Paladin', type:'active', damageType:'holy', power:0, cooldown:90, resource:35 },
  { id:'necromancer-shadow-bolt', name:'Shadow Bolt', class:'Necromancer', type:'active', damageType:'shadow', power:1.7, cooldown:3, resource:18 },
  { id:'summoner-void-beast', name:'Void Beast', class:'Summoner', type:'active', damageType:'void', power:1.4, cooldown:15, resource:30 },
  { id:'battlemage-arcane-strike', name:'Arcane Strike', class:'Battlemage', type:'active', damageType:'arcane', power:1.75, cooldown:4, resource:20 },
  { id:'berserker-rage', name:'Berserker Rage', class:'Berserker', type:'active', damageType:'physical', power:0, cooldown:45, resource:25 }
]);

export const TALENT_TREES = Object.freeze([
  { id:'offense', name:'Offense', nodes:['weapon-mastery','critical-focus','executioner','overpower'] },
  { id:'defense', name:'Defense', nodes:['fortitude','armor-training','tenacity','last-stand'] },
  { id:'arcane', name:'Arcane', nodes:['spell-power','mana-efficiency','elemental-focus','arcane-surge'] },
  { id:'support', name:'Support', nodes:['healing-power','cooldown-aura','resource-flow','battle-command'] }
]);

export function getSkill(id) { return SKILLS.find(skill => skill.id === id) ?? null; }
export function getClassSkills(className) { return SKILLS.filter(skill => skill.class === className); }
export function createLoadout(skillIds = []) { return { slots: Array.from({ length: 12 }, (_, i) => skillIds[i] ?? null), ultimate: null }; }
export function validateLoadout(loadout) { return Array.isArray(loadout?.slots) && loadout.slots.length === 12 && loadout.slots.every(id => id === null || Boolean(getSkill(id))); }
export function calculateSkillPower(skill, characterLevel, mastery = 0) { const s = typeof skill === 'string' ? getSkill(skill) : skill; if (!s) return 0; return Math.floor((100 + characterLevel * 8 + mastery * 25) * s.power); }
