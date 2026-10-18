export const NPCS = Object.freeze([
  {id:'captain_lyra',name:'Captain Lyra',role:'quest_giver',zone:'verdant_frontier',services:['quests','travel']},
  {id:'brother_aeron',name:'Brother Aeron',role:'healer',zone:'verdant_frontier',services:['heal','buffs']},
  {id:'master_borin',name:'Master Borin',role:'blacksmith',zone:'ironhold',services:['crafting','upgrade','repair']},
  {id:'selene_veil',name:'Selene Veil',role:'rogue_trainer',zone:'eclipsed_realm',services:['skills','talents']},
  {id:'archmage_iona',name:'Archmage Iona',role:'mage_trainer',zone:'skyreach',services:['skills','teleport']},
  {id:'warden_thane',name:'Warden Thane',role:'tower_keeper',zone:'eternity_nexus',services:['tower','leaderboard']},
  {id:'quartermaster_rex',name:'Quartermaster Rex',role:'merchant',zone:'sunscar_desert',services:['shop','bank']},
  {id:'guildmaster_mira',name:'Guildmaster Mira',role:'guild_master',zone:'ironhold',services:['guild','guild_quests']},
  {id:'ferryman_kael',name:'Ferryman Kael',role:'ferryman',zone:'frostfall',services:['travel','ferry']},
  {id:'relic_seeker',name:'The Relic Seeker',role:'collector',zone:'astral_wastes',services:['relic_exchange','daily_quest']}
]);
export function getNPC(id){return NPCS.find(n=>n.id===id)||null}
export function getNPCsByRole(role){return NPCS.filter(n=>n.role===role)}
