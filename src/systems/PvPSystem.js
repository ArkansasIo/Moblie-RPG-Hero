export const PVP_MODES = Object.freeze(['Duel', 'Arena', 'Battleground', 'GuildWar']);

export function createMatch(mode, players = []) {
  if (!PVP_MODES.includes(mode)) throw new Error(`Unsupported PvP mode: ${mode}`);
  return {
    id: `pvp-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    mode,
    players: [...players],
    scores: Object.fromEntries(players.map((id) => [id, 0])),
    status: 'queued',
    createdAt: Date.now(),
  };
}

export function startMatch(match) {
  return match?.status === 'queued' ? { ...match, status: 'active', startedAt: Date.now() } : match;
}

export function recordPvpScore(match, playerId, points = 1) {
  if (!match || match.status !== 'active' || !match.players.includes(playerId)) return match;
  return { ...match, scores: { ...match.scores, [playerId]: Math.max(0, (match.scores[playerId] ?? 0) + points) } };
}

export function finishMatch(match) {
  if (!match) return null;
  const ranking = Object.entries(match.scores).sort((a, b) => b[1] - a[1]);
  return { ...match, status: 'complete', finishedAt: Date.now(), winnerId: ranking[0]?.[0] ?? null, ranking };
}
