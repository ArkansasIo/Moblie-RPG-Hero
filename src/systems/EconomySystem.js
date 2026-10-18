export const CURRENCIES = Object.freeze(['gold', 'gems', 'honor', 'guildTokens']);

export function createWallet() { return { gold:0, gems:0, honor:0, guildTokens:0 }; }

export function deposit(wallet, currency, amount) {
  if (!CURRENCIES.includes(currency) || amount <= 0) return wallet;
  return { ...wallet, [currency]: Math.floor(wallet[currency] + amount) };
}

export function spend(wallet, currency, amount) {
  const value = Math.floor(amount);
  if (!CURRENCIES.includes(currency) || value <= 0 || wallet[currency] < value) return { wallet, success:false };
  return { wallet:{ ...wallet, [currency]:wallet[currency] - value }, success:true };
}

export function vendorQuote(item, quantity = 1, markup = 1) {
  return Math.max(0, Math.ceil((item.value ?? item.price ?? 0) * quantity * markup));
}

export function listAuctionItem(listing, now = Date.now()) {
  if (!listing.itemId || listing.price <= 0 || listing.expiresAt <= now) return null;
  return { ...listing, state:'listed', createdAt:now };
}
