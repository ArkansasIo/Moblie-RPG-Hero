export const GUILD_RANKS = Object.freeze({ Member: 0, Officer: 1, Leader: 2 });

export function createGuild(name, leaderId) {
  if (!name?.trim()) throw new Error('Guild name is required');
  return {
    id: `guild-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    name: name.trim(),
    level: 1,
    experience: 0,
    leaderId,
    members: [{ playerId: leaderId, rank: GUILD_RANKS.Leader, joinedAt: Date.now() }],
    bank: { gold: 0, items: [] },
    announcements: [],
  };
}

export function addGuildMember(guild, playerId, rank = GUILD_RANKS.Member) {
  if (guild.members.some((member) => member.playerId === playerId)) return guild;
  return { ...guild, members: [...guild.members, { playerId, rank, joinedAt: Date.now() }] };
}

export function removeGuildMember(guild, playerId) {
  if (playerId === guild.leaderId) throw new Error('Guild leader cannot be removed');
  return { ...guild, members: guild.members.filter((member) => member.playerId !== playerId) };
}

export function addGuildExperience(guild, amount) {
  const experience = Math.max(0, guild.experience + amount);
  const level = Math.min(100, 1 + Math.floor(Math.sqrt(experience / 100)));
  return { ...guild, experience, level };
}
