export const API_VERSION = 'v1';

export const API_ROUTES = Object.freeze({
  health: '/api/v1/health',
  profile: '/api/v1/player/profile',
  save: '/api/v1/player/save',
  inventory: '/api/v1/player/inventory',
  quests: '/api/v1/player/quests',
  world: '/api/v1/world/state',
  dungeonQueue: '/api/v1/matchmaking/dungeon',
  party: '/api/v1/social/party',
  guild: '/api/v1/social/guild',
  leaderboard: '/api/v1/leaderboards',
});

export function requestEnvelope(type, payload = {}, requestId = crypto.randomUUID()) {
  return { apiVersion: API_VERSION, requestId, type, timestamp: Date.now(), payload };
}

export function responseEnvelope(requestId, payload = {}, error = null) {
  return { apiVersion: API_VERSION, requestId, timestamp: Date.now(), ok: !error, payload, error };
}

export function validateEnvelope(message) {
  return Boolean(message && message.apiVersion === API_VERSION && typeof message.requestId === 'string' && typeof message.type === 'string');
}
