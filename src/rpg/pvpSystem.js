export const PVP_MODES=Object.freeze(['arena-1v1','arena-2v2','arena-3v3','battleground','open-world','faction-war','duel']);
export function createPvpProfile(playerId){return {playerId,rating:1000,wins:0,losses:0,season:1,honor:0,kills:0,deaths:0,rank:'bronze'};}
export function getPvpRank(rating){if(rating>=2400)return'master';if(rating>=2000)return'diamond';if(rating>=1600)return'platinum';if(rating>=1300)return'gold';if(rating>=1100)return'silver';return'bronze';}
export function recordPvpResult(profile,result,opponentRating=1000){const expected=1/(1+Math.pow(10,(opponentRating-profile.rating)/400));const actual=result==='win'?1:0;const rating=Math.max(0,Math.round(profile.rating+32*(actual-expected)));return {...profile,rating,wins:profile.wins+(result==='win'?1:0),losses:profile.losses+(result==='loss'?1:0),honor:profile.honor+(result==='win'?20:5),rank:getPvpRank(rating)};}
export function createMatch(mode,players=[]){return {id:`pvp-${Date.now()}`,mode,players,status:'queued',createdAt:Date.now()};}
export function seasonReset(profile,season){return {...profile,rating:1000,season,honor:0,rank:'bronze'};}
