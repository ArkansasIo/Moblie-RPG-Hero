export const TALENT_TREES = Object.freeze({
  warrior:[{id:'warrior-brutality',name:'Brutality',maxRank:10,stat:'strength',valuePerRank:2},{id:'warrior-endurance',name:'Endurance',maxRank:10,stat:'vitality',valuePerRank:2}],
  knight:[{id:'knight-fortress',name:'Living Fortress',maxRank:10,stat:'armor',valuePerRank:3},{id:'knight-aegis',name:'Aegis',maxRank:10,stat:'block',valuePerRank:1}],
  rogue:[{id:'rogue-lethality',name:'Lethality',maxRank:10,stat:'crit',valuePerRank:1},{id:'rogue-evasion',name:'Evasion',maxRank:10,stat:'evasion',valuePerRank:2}],
  ranger:[{id:'ranger-focus',name:'Hunter Focus',maxRank:10,stat:'crit',valuePerRank:1},{id:'ranger-range',name:'Longshot',maxRank:10,stat:'rangedDamage',valuePerRank:2}],
  mage:[{id:'mage-mastery',name:'Arcane Mastery',maxRank:10,stat:'spellPower',valuePerRank:3},{id:'mage-mana',name:'Mana Wellspring',maxRank:10,stat:'mana',valuePerRank:2}],
  cleric:[{id:'cleric-grace',name:'Grace',maxRank:10,stat:'healingPower',valuePerRank:3},{id:'cleric-faith',name:'Faith',maxRank:10,stat:'holyPower',valuePerRank:2}]
});

export function getTalentTree(classId) { return TALENT_TREES[classId] ?? []; }
export function createTalentState(classId) { return Object.fromEntries(getTalentTree(classId).map(t=>[t.id,0])); }
export function spendTalentPoint(state, talentId) { const current=Number(state?.[talentId]??0); const tree=Object.values(TALENT_TREES).flat(); const talent=tree.find(t=>t.id===talentId); if(!talent||current>=talent.maxRank) return state; return {...state,[talentId]:current+1}; }
