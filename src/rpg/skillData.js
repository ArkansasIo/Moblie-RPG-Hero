export const SKILL_CATEGORIES = Object.freeze(['active','passive','ultimate','utility','movement']);
export const DAMAGE_TYPES = Object.freeze(['physical','fire','frost','lightning','nature','arcane','shadow','void','holy']);

export const SKILLS = Object.freeze([
  { id:'warrior-slash', classId:'warrior', name:'Cleave', category:'active', damageType:'physical', power:1.25, cooldown:2 },
  { id:'warrior-guard', classId:'warrior', name:'Iron Guard', category:'utility', effect:'damage-reduction', duration:6, cooldown:18 },
  { id:'knight-shield', classId:'knight', name:'Shield Wall', category:'utility', effect:'block', duration:8, cooldown:24 },
  { id:'rogue-backstab', classId:'rogue', name:'Backstab', category:'active', damageType:'physical', power:2.1, cooldown:4 },
  { id:'ranger-volley', classId:'ranger', name:'Volley', category:'active', damageType:'physical', power:1.4, cooldown:6 },
  { id:'mage-fireball', classId:'mage', name:'Fireball', category:'active', damageType:'fire', power:1.8, cooldown:3 },
  { id:'elementalist-storm', classId:'elementalist', name:'Stormcall', category:'active', damageType:'lightning', power:2.2, cooldown:8 },
  { id:'cleric-heal', classId:'cleric', name:'Greater Heal', category:'active', effect:'heal', power:2.4, cooldown:3 },
  { id:'paladin-hammer', classId:'paladin', name:'Radiant Hammer', category:'active', damageType:'holy', power:1.7, cooldown:5 },
  { id:'necromancer-raise', classId:'necromancer', name:'Raise Dead', category:'active', effect:'summon', duration:30, cooldown:20 },
  { id:'summoner-familiar', classId:'summoner', name:'Primal Familiar', category:'active', effect:'summon', duration:60, cooldown:30 },
  { id:'battlemage-arcane', classId:'battlemage', name:'Arcane Blade', category:'active', damageType:'arcane', power:2.0, cooldown:5 }
]);

export function getSkillsForClass(classId) { return SKILLS.filter(s=>s.classId===classId); }
export function calculateSkillPower(skill, level, weaponPower=0) { return Math.floor((Number(skill.power)||1) * (100 + Math.max(1, level)*12) + weaponPower); }
