import catalog from './data/assetContentCatalog.json' with { type: 'json' };
import progression from './data/levelProgression720.json' with { type: 'json' };

export const ASSET_CONTENT = Object.freeze(catalog.content);
export const LEVEL_PROGRESSION = Object.freeze(progression);

export function getContent(category) {
  return ASSET_CONTENT[category] ?? [];
}

export function getLevelBand(level) {
  const value = Math.max(1, Math.min(progression.levelCap, Number(level) || 1));
  return progression.bands.find((band) => value >= band.min && value <= band.max) ?? progression.bands.at(-1);
}

export function getContentForLevel(category, level) {
  const items = getContent(category);
  const band = getLevelBand(level);
  if (!items.length) return [];
  const index = Math.max(0, Math.floor(((band.min - 1) / progression.levelCap) * items.length));
  const count = Math.max(1, Math.ceil(items.length / progression.bands.length));
  return items.slice(index, index + count);
}

export function getTowerFloor(level, floor = 1) {
  const band = getLevelBand(level);
  return { band, floor: Math.max(1, Math.min(100, Number(floor) || 1)) };
}

export function getAssetSummary() {
  return Object.fromEntries(Object.entries(ASSET_CONTENT).map(([key, values]) => [key, values.length]));
}
