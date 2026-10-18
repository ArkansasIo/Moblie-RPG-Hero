export const PARTY_ROLES=Object.freeze(['tank','healer','dps','support']);
export const GUILD_RANKS=Object.freeze(['Guild Master','Officer','Veteran','Member','Recruit']);
export function createSocialState(playerId=null){return {playerId,friends:[],blocked:[],partyId:null,guildId:null,status:'online',chatChannels:['global','local','party','guild','system'],mail:[]};}
export function addFriend(state,playerId){if(state.friends.includes(playerId)||state.blocked.includes(playerId))return state;return {...state,friends:[...state.friends,playerId]};}
export function blockPlayer(state,playerId){return {...state,friends:state.friends.filter(id=>id!==playerId),blocked:[...new Set([...state.blocked,playerId])]};}
export function removeFriend(state,playerId){return {...state,friends:state.friends.filter(id=>id!==playerId)};}
export function createParty(leaderId){return {id:`party-${Date.now()}`,leaderId,members:[{id:leaderId,role:null}],maxSize:5,state:'forming'};}
export function joinParty(party,playerId,role='dps'){if(party.members.length>=party.maxSize||party.members.some(m=>m.id===playerId))return party;return {...party,members:[...party.members,{id:playerId,role}],state:'forming'};}
export function leaveParty(party,playerId){const members=party.members.filter(m=>m.id!==playerId);return {...party,members,leaderId:party.leaderId===playerId?(members[0]?.id??null):party.leaderId,state:members.length?'forming':'disbanded'};}
export function partyReady(party){return party.members.length>=2&&party.members.every(m=>!m.role||PARTY_ROLES.includes(m.role));}
export function createGuild(name,founderId){return {id:`guild-${Date.now()}`,name,level:1,xp:0,leaderId:founderId,members:[{id:founderId,rank:'Guild Master'}],bank:{slots:200},missions:[],perks:[]};}
export function addGuildMember(guild,playerId,rank='Recruit'){if(guild.members.some(m=>m.id===playerId))return guild;return {...guild,members:[...guild.members,{id:playerId,rank}]};}
export function grantGuildXP(guild,amount){let xp=Math.max(0,guild.xp+amount),level=guild.level;while(level<100&&xp>=level*10000){xp-=level*10000;level++;}return {...guild,level,xp};}
