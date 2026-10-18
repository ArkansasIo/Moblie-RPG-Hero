export function createSocialState() {
  return { friends: [], party: null, guild: null, chat: [], notifications: [] };
}

export function createParty(leaderId, maxSize = 5) {
  return { id: crypto.randomUUID(), leaderId, maxSize, members: [{ id: leaderId, role: 'leader', ready: false }], state: 'forming' };
}

export function joinParty(party, playerId, role = 'dps') {
  if (party.members.some((member) => member.id === playerId)) return party;
  if (party.members.length >= party.maxSize) throw new Error('Party is full');
  return { ...party, members: [...party.members, { id: playerId, role, ready: false }] };
}

export function leaveParty(party, playerId) {
  const members = party.members.filter((member) => member.id !== playerId);
  if (!members.length) return null;
  const leader = members.some((member) => member.id === party.leaderId) ? party.leaderId : members[0].id;
  return { ...party, leaderId: leader, members };
}

export function addChatMessage(state, channel, authorId, text) {
  const clean = String(text).trim().slice(0, 500);
  if (!clean) return state;
  return { ...state, chat: [...state.chat.slice(-199), { id: crypto.randomUUID(), channel, authorId, text: clean, createdAt: Date.now() }] };
}
