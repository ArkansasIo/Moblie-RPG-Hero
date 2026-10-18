export const RPG_SUBMENUS=Object.freeze({
  character:{profile:['Overview','Attributes','Skills','Talents','Classes','Reputation','Titles']},
  inventory:{items:['Bag','Equipment','Loadouts','Crafting','Materials','Collections']},
  world:{navigation:['World Map','Zones','Biomes','Points of Interest'],instances:['Dungeons','Raids','World Bosses','Events']},
  combat:{battle:['Combat','Abilities','Buffs & Debuffs','Threat'],telemetry:['Damage Log','Training']},
  quests:{journal:['Quest Log','Main Story','Side Quests'],rotations:['Daily','Weekly','Achievements']},
  multiplayer:{groups:['Party','Guild'],communication:['Friends','Mail','Chat'],trade:['Trading','Social']},
  pvp:{matchmaking:['Arena','Battlegrounds','Ranked','Duels'],competitive:['Leaderboards','PvP Season']},
  progression:{character:['Leveling','Experience','Gear Score','Masteries'],longTerm:['Research','Endgame']},
  economy:{wallet:['Currency'],market:['Marketplace','Auction House'],storage:['Bank'],shops:['Vendors'],analytics:['Economy']},
  system:{preferences:['Settings','Controls','Audio','Video','Accessibility'],maintenance:['Save/Load','Help','About']}
});
export function submenuFor(group){return RPG_SUBMENUS[group]??{};}
