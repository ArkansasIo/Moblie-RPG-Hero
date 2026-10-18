export const CURRENCIES = Object.freeze(['gold','premium','honor','guildTokens','craftingMarks','eventTokens']);
export function createWallet() { return Object.fromEntries(CURRENCIES.map(c=>[c,0])); }
export function addCurrency(wallet,currency,amount) { if(!CURRENCIES.includes(currency)) return wallet; return {...wallet,[currency]:Math.max(0,(wallet[currency]??0)+Math.floor(amount))}; }
export function spendCurrency(wallet,currency,amount) { if(!CURRENCIES.includes(currency)||amount<0||(wallet[currency]??0)<amount) return null; return {...wallet,[currency]:wallet[currency]-amount}; }
export function createListing(sellerId,item,price,currency='gold') { return {id:`listing-${Date.now()}-${Math.random().toString(36).slice(2,7)}`,sellerId,item,price,currency,status:'active',createdAt:Date.now()}; }
export function buyListing(listing,buyerId) { if(listing.status!=='active') return null; return {...listing,status:'sold',buyerId,soldAt:Date.now()}; }
