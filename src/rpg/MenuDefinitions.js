export const MENU_DEFINITIONS=Object.freeze({
  character:{label:'Character',icon:'♙',pages:['Overview','Attributes','Skills','Talents','Classes','Reputation','Titles']},
  inventory:{label:'Inventory',icon:'▣',pages:['Bag','Equipment','Loadouts','Crafting','Materials','Collections']},
  world:{label:'World',icon:'⌖',pages:['World Map','Zones','Biomes','Points of Interest','Dungeons','Raids','World Bosses','Events']},
  combat:{label:'Combat',icon:'⚔',pages:['Combat','Abilities','Buffs & Debuffs','Threat','Damage Log','Training']},
  quests:{label:'Quests',icon:'✦',pages:['Quest Log','Main Story','Side Quests','Daily','Weekly','Achievements']},
  multiplayer:{label:'Multiplayer',icon:'♟',pages:['Party','Guild','Friends','Mail','Chat','Trading','Social']},
  pvp:{label:'PvP',icon:'⚑',pages:['Arena','Battlegrounds','Ranked','Duels','Leaderboards','PvP Season']},
  progression:{label:'Progression',icon:'↗',pages:['Leveling','Experience','Gear Score','Masteries','Research','Endgame']},
  economy:{label:'Economy',icon:'¤',pages:['Currency','Marketplace','Auction House','Bank','Vendors','Economy']},
  system:{label:'System',icon:'⚙',pages:['Settings','Controls','Audio','Video','Accessibility','Save/Load','Help','About']}
});
export const PAGE_META=Object.freeze(Object.fromEntries(Object.entries(MENU_DEFINITIONS).flatMap(([menu,data])=>data.pages.map(page=>[page,{menu,label:page,id:page.toLowerCase().replace(/[^a-z0-9]+/g,'-')}]))));
export const QUICK_ACTIONS=Object.freeze(['Character','Inventory','World Map','Quest Log','Party','Guild','Marketplace','Settings']);
export function getMenuDefinition(id){return MENU_DEFINITIONS[id]??null}
export function getPageMeta(page){return PAGE_META[page]??null}
