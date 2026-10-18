export function createSocialState() { return {friends:[],blocked:[],partyId:null,guildId:null,chatChannels:['global','local','party','guild','system'],mail:[]}; }
export function addFriend(state,playerId) { if(state.friends.includes(playerId)||state.blocked.includes(playerId)) return state; return {...state,friends:[...state.friends,playerId]}; }
export function blockPlayer(state,playerId) { return {...state,friends:state.friends.filter(id=>id!==playerId),blocked:[...new Set([...state.blocked,playerId])]}; }
export function removeFriend(state,playerId) { return {...state,friends:state.friends.filter(id=>id!==playerId)}; }
export function createParty(leaderId) { return {id:`party-${Date.now()}`,leaderId,members:[leaderId],maxSize:5,state:'forming'}; }
export function joinParty(party,playerId) { if(party.members.length>=party.maxSize||party.members.includes(playerId)) return party; return {...party,members:[...party.members,playerId],state:'ready'}; }
export function leaveParty(party,playerId) { const members=party.members.filter(id=>id!==playerId); return {...party,members,leaderId:party.leaderId===playerId?(members[0]??null):party.leaderId,state:members.length?'forming':'disbanded'}; }
