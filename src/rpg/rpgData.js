export const RPG_MENUS = {
  character: ['Overview', 'Attributes', 'Skills', 'Talents', 'Classes', 'Reputation', 'Titles'],
  inventory: ['Bag', 'Equipment', 'Loadouts', 'Crafting', 'Materials', 'Collections'],
  world: ['World Map', 'Zones', 'Biomes', 'Points of Interest', 'Dungeons', 'Raids', 'World Bosses', 'Events'],
  combat: ['Combat', 'Abilities', 'Buffs & Debuffs', 'Threat', 'Damage Log', 'Training'],
  quests: ['Quest Log', 'Main Story', 'Side Quests', 'Daily', 'Weekly', 'Achievements'],
  multiplayer: ['Party', 'Guild', 'Friends', 'Mail', 'Chat', 'Trading', 'Social'],
  pvp: ['Arena', 'Battlegrounds', 'Ranked', 'Duels', 'Leaderboards', 'PvP Season'],
  progression: ['Leveling', 'Experience', 'Gear Score', 'Masteries', 'Research', 'Endgame'],
  economy: ['Currency', 'Marketplace', 'Auction House', 'Bank', 'Vendors', 'Economy'],
  system: ['Settings', 'Controls', 'Audio', 'Video', 'Accessibility', 'Save/Load', 'Help', 'About']
};

export const CORE_ATTRIBUTES = ['STR','DEX','CON','INT','WIS','VIT','SPI','LCK','WIL','CHA'];
export const DAMAGE_TYPES = ['Physical','Fire','Ice','Lightning','Earth','Wind','Water','Light','Dark','Arcane','Poison','Bleed','Void','Chaos','True'];
export const RESOURCES = ['HP','MP','STA','Energy','Rage','Focus','Faith','Aether','Heat','Sanity'];
export const RARITIES = ['Common','Uncommon','Rare','Epic','Legendary','Mythic','Ascended'];
export const ENEMY_RANKS = ['Normal','Veteran','Elite','Champion','Boss','Raid Boss','Mythic','Ascended'];
export const AI_ARCHETYPES = ['Bruiser','Tank','Assassin','Sniper','Caster','Controller','Summoner','Support','Trickster'];
export const EQUIPMENT_SLOTS = ['Head','Chest','Legs','Gloves','Boots','MainHand','OffHand','Ring1','Ring2','Amulet','Cloak','Belt','Trinket1','Trinket2'];
export const WEAPON_TYPES = ['Greatsword','Longsword','Axe','Mace','Spear','Dagger','Claw','Scythe','Bow','Crossbow','Gun','Throwing','Staff','Wand','Tome','Catalyst','Relic'];
export const ARMOR_TYPES = ['Light','Medium','Heavy'];
export const DEFAULT_PVE_PVP_RULES = { pve:{damage:1,crit:1,healing:1,cdr:1,cc:1}, pvp:{damage:.70,crit:.50,healing:.65,cdr:.50,cc:.40}, caps:{pveCrit:.70,pvpCrit:.40,pveCdr:.60,pvpCdr:.35,pvpCc:.50,damageReduction:.70} };
export const ITEM_STAT_WEIGHTS = { STR:1,DEX:1,INT:1,VIT:.85,CON:.85,CritChance:2.5,CritDamage:1.75,AttackSpeed:2,CDR:2.25,Armor:.75,Resistance:.9,PvPResilience:3 };
export function clamp(value,min,max){return Math.max(min,Math.min(max,value));}
export function levelCurve(level){return Math.floor(Math.pow(Math.max(1,level),2.5)*500);}
export function maxHp(vit,con,gearHp=0){return vit*15+con*10+gearHp;}
export function physicalDamage(str,weaponMultiplier=1){return str*2.5*weaponMultiplier;}
export function critChance(dex,gearCrit=0){return clamp(dex*.04+gearCrit,0,.70);}
export function mitigation(armor,level=1,k=75){return armor/(armor+k*Math.max(1,level));}
export function damageTaken(raw,armor,resist=0,vulnerability=1,level=1){return raw*(1-mitigation(armor,level))*(1-clamp(resist,0,.95))*vulnerability;}
export function hitChance(accuracy,evasion){return clamp(accuracy/Math.max(1,accuracy+evasion),.05,.95);}
export function itemPower(stats={},procValue=0,setBonusValue=0){return Object.entries(stats).reduce((sum,[key,value])=>sum+(Number(value)||0)*(ITEM_STAT_WEIGHTS[key]??1),0)+procValue+setBonusValue;}
export function bossHp(baseHp,levelDiff=0,players=1,difficulty=1){return baseHp*(1+levelDiff*.18)*(1+Math.max(0,players-1)*.65)*difficulty;}
export function bossDamage(baseDamage,levelDiff=0,difficulty=1,players=1){return baseDamage*(1+levelDiff*.12)*difficulty*Math.pow(Math.max(1,players),.6);}
export function threat(damage,healing,flatThreat=0,damageThreat=1,healingThreat=.5,tauntOverride=0){return tauntOverride||damage*damageThreat+healing*healingThreat+flatThreat;}
