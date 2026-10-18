export class ItemSystem {
  constructor() { this.items = new Map(); this.equipped = new Map(); }
  add(item) { this.items.set(item.id, item); return item; }
  remove(id) { const item = this.items.get(id); this.items.delete(id); return item; }
  equip(characterId, item) { if (!item.slot) throw new Error('Item has no equipment slot'); this.equipped.set(`${characterId}:${item.slot}`, item); return item; }
  getEquipment(characterId) { return [...this.equipped.entries()].filter(([k]) => k.startsWith(`${characterId}:`)).map(([,v]) => v); }
  score(item) { return (item.power ?? 0) + (item.procValue ?? 0) + (item.setBonusValue ?? 0); }
}

export class DungeonSystem {
  constructor() { this.instances = new Map(); }
  create(template, party, difficulty = 'Normal') {
    const id = `dungeon-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
    const instance = { id, template, party: party.map(p => p.id), difficulty, room: 0, state: 'active', deaths: 0, timer: 0 };
    this.instances.set(id, instance); return instance;
  }
  nextRoom(id) { const d = this.instances.get(id); if (!d) return null; d.room++; return d; }
  fail(id, reason = 'party defeated') { const d = this.instances.get(id); if (!d) return null; d.state = 'failed'; d.reason = reason; return d; }
  complete(id, rewards = []) { const d = this.instances.get(id); if (!d) return null; d.state = 'completed'; d.rewards = rewards; return d; }
}

export class WorldSystem {
  constructor() { this.zones = new Map(); this.events = new Map(); this.worldBosses = new Map(); }
  registerZone(zone) { this.zones.set(zone.id, zone); return zone; }
  startEvent(event) { this.events.set(event.id, { ...event, state: 'active', startedAt: Date.now() }); return this.events.get(event.id); }
  spawnWorldBoss(boss) { this.worldBosses.set(boss.id, { ...boss, state: 'spawned', spawnedAt: Date.now() }); return this.worldBosses.get(boss.id); }
  listAvailableZones(level) { return [...this.zones.values()].filter(z => level >= (z.minLevel ?? 1) && level <= (z.maxLevel ?? 999)); }
}

export class QuestSystem {
  constructor() { this.quests = new Map(); }
  accept(quest, playerId) { this.quests.set(`${playerId}:${quest.id}`, { ...quest, playerId, status: 'active', progress: {} }); return this.quests.get(`${playerId}:${quest.id}`); }
  progress(playerId, questId, objective, amount = 1) { const q = this.quests.get(`${playerId}:${questId}`); if (!q) return null; q.progress[objective] = (q.progress[objective] ?? 0) + amount; return q; }
  complete(playerId, questId) { const q = this.quests.get(`${playerId}:${questId}`); if (!q) return null; q.status = 'completed'; return q; }
}

export class GuildSystem {
  constructor() { this.guilds = new Map(); }
  create(ownerId, name) { const id = `guild-${Date.now()}`; const guild = { id, name, ownerId, members: [ownerId], level: 1, bank: [], treasury: 0, permissions: {} }; this.guilds.set(id, guild); return guild; }
  invite(guildId, playerId) { const g = this.guilds.get(guildId); if (!g || g.members.includes(playerId)) return false; g.members.push(playerId); return true; }
  leave(guildId, playerId) { const g = this.guilds.get(guildId); if (!g) return false; g.members = g.members.filter(id => id !== playerId); return true; }
}

export class EconomySystem {
  constructor() { this.balances = new Map(); this.listings = new Map(); }
  balance(playerId) { return this.balances.get(playerId) ?? 0; }
  credit(playerId, amount) { this.balances.set(playerId, this.balance(playerId) + Math.max(0, amount)); return this.balance(playerId); }
  debit(playerId, amount) { if (this.balance(playerId) < amount) return false; this.balances.set(playerId, this.balance(playerId) - amount); return true; }
  list(sellerId, item, price) { if (!this.debit(sellerId, 0)) return null; const id = `listing-${Date.now()}-${Math.random().toString(36).slice(2,6)}`; const listing = { id, sellerId, item, price, createdAt: Date.now() }; this.listings.set(id, listing); return listing; }
  buy(buyerId, listingId) { const l = this.listings.get(listingId); if (!l || !this.debit(buyerId, l.price)) return null; this.credit(l.sellerId, l.price); this.listings.delete(listingId); return l.item; }
}

export class SocialSystem {
  constructor() { this.friends = new Map(); this.mail = []; this.chat = []; }
  addFriend(a, b) { const set = this.friends.get(a) ?? new Set(); set.add(b); this.friends.set(a, set); }
  sendMail(from, to, subject, body, attachments = []) { const mail = { id: `mail-${Date.now()}`, from, to, subject, body, attachments, read: false }; this.mail.push(mail); return mail; }
  sendChat(channel, from, text) { const message = { id: `msg-${Date.now()}`, channel, from, text, createdAt: Date.now() }; this.chat.push(message); return message; }
}
