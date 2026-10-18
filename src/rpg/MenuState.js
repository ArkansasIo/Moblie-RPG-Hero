export const MENU_GROUPS = Object.freeze({
  character:['Overview','Attributes','Skills','Talents','Classes','Reputation','Titles'],
  inventory:['Bag','Equipment','Loadouts','Crafting','Materials','Collections'],
  world:['World Map','Zones','Biomes','Points of Interest','Dungeons','Raids','World Bosses','Events'],
  combat:['Combat','Abilities','Buffs & Debuffs','Threat','Damage Log','Training'],
  quests:['Quest Log','Main Story','Side Quests','Daily','Weekly','Achievements'],
  multiplayer:['Party','Guild','Friends','Mail','Chat','Trading','Social'],
  pvp:['Arena','Battlegrounds','Ranked','Duels','Leaderboards','PvP Season'],
  progression:['Leveling','Experience','Gear Score','Masteries','Research','Endgame'],
  economy:['Currency','Marketplace','Auction House','Bank','Vendors','Economy'],
  system:['Settings','Controls','Audio','Video','Accessibility','Save/Load','Help','About']
});

export class MenuState {
  constructor(){ this.group='character'; this.page='Overview'; this.history=[]; this.modal=null; this.search=''; }
  selectGroup(group){ if(!MENU_GROUPS[group]) return; this.group=group; this.page=MENU_GROUPS[group][0]; }
  selectPage(page){ if(!MENU_GROUPS[this.group]?.includes(page)) return; this.history.push({group:this.group,page:this.page}); this.page=page; }
  back(){ const previous=this.history.pop(); if(previous){this.group=previous.group;this.page=previous.page;} }
  openModal(id){this.modal=id;}
  closeModal(){this.modal=null;}
  setSearch(value){this.search=String(value??'');}
  snapshot(){return {group:this.group,page:this.page,history:[...this.history],modal:this.modal,search:this.search};}
}
