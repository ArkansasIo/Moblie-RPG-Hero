export const GUILD_RANKS = Object.freeze(['guildmaster','officer','veteran','member','recruit']);
export function createGuild(name,leaderId) { return {id:`guild-${Date.now()}`,name,leaderId,level:1,xp:0,members:[{id:leaderId,rank:'guildmaster'}],bank:{},achievements:[],territory:null}; }
export function addGuildMember(guild,playerId,rank='recruit') { if(guild.members.some(m=>m.id===playerId)) return guild; return {...guild,members:[...guild.members,{id:playerId,rank}]}; }
export function removeGuildMember(guild,playerId) { return {...guild,members:guild.members.filter(m=>m.id!==playerId)}; }
export function addGuildXP(guild,amount) { const xp=Math.max(0,guild.xp+amount); const level=Math.min(100,1+Math.floor(Math.sqrt(xp/1000))); return {...guild,xp,level}; }
export function setGuildRank(guild,playerId,rank) { if(!GUILD_RANKS.includes(rank)) return guild; return {...guild,members:guild.members.map(m=>m.id===playerId?{...m,rank}:m)}; }
