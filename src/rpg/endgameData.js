export const RAIDS = Object.freeze([
  { id:'citadel-of-ashes', name:'Citadel of Ashes', minLevel:55, maxLevel:65, partySize:[8,12], wings:3, weekly:true, bosses:['Ash General','Cinder Queen','Volcanic Colossus'] },
  { id:'skyfall-sanctum', name:'Skyfall Sanctum', minLevel:70, maxLevel:82, partySize:[10,16], wings:4, weekly:true, bosses:['Storm Seraph','Aether Engine','Skyfall Sovereign'] },
  { id:'end-of-stars', name:'End of Stars', minLevel:90, maxLevel:100, partySize:[12,20], wings:5, weekly:true, bosses:['Void Herald','Paradox Trinity','The Endbringer'] }
]);

export const TOWER = Object.freeze({
  id:'tower-of-ascension', name:'Tower of Ascension', floors:100,
  bossFloors:[10,20,30,40,50,60,70,80,90,100],
  eliteFloors:[5,15,25,35,45,55,65,75,85,95],
  themes:['Forest','Stone','Desert','Frost','Swamp','Volcanic','Storm','Arcane','Void','Paradox']
});

export function getTowerFloor(floor) {
  if (!Number.isInteger(floor) || floor < 1 || floor > TOWER.floors) return null;
  const theme = TOWER.themes[Math.min(TOWER.themes.length - 1, Math.floor((floor - 1) / 10))];
  return { floor, theme, boss:TOWER.bossFloors.includes(floor), elite:TOWER.eliteFloors.includes(floor) };
}
