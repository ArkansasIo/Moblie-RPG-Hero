import { ASSET_MANIFEST, FANTASY_STYLE, resolveAsset } from '../data/assetRegistry.js';

const CATEGORY_ATLAS = Object.freeze({
  heroes: ASSET_MANIFEST.atlases.hero,
  races: ASSET_MANIFEST.atlases.hero,
  weapons: ASSET_MANIFEST.atlases.equipment,
  armor: ASSET_MANIFEST.atlases.equipment,
  equipment: ASSET_MANIFEST.atlases.equipment,
  items: ASSET_MANIFEST.atlases.item,
  spells: ASSET_MANIFEST.atlases.effects,
  skills: ASSET_MANIFEST.atlases.effects,
  status: ASSET_MANIFEST.atlases.effects,
  monsters: ASSET_MANIFEST.atlases.enemy,
  bosses: ASSET_MANIFEST.atlases.boss,
  biomes: ASSET_MANIFEST.atlases.biome,
  dungeons: ASSET_MANIFEST.atlases.dungeon,
  tower: ASSET_MANIFEST.atlases.tower,
  world: ASSET_MANIFEST.atlases.world,
  ui: ASSET_MANIFEST.atlases.ui,
  fantasySheet: ASSET_MANIFEST.atlases.dnd5e,
});

export function getFantasyCategoryAsset(category) {
  const path = CATEGORY_ATLAS[category] ?? CATEGORY_ATLAS.fantasySheet;
  return resolveAsset(path);
}

export function getFantasyTheme() {
  return FANTASY_STYLE;
}

export function getFantasyAssetManifest() {
  return ASSET_MANIFEST;
}

export function createFantasyAssetDescriptor(category, id, options = {}) {
  return Object.freeze({
    category,
    id,
    atlas: getFantasyCategoryAsset(category),
    style: FANTASY_STYLE.theme,
    rarity: options.rarity ?? 'common',
    scale: options.scale ?? 1,
    frame: options.frame ?? 0,
  });
}

export const FANTASY_ASSET_CATEGORIES = Object.freeze(Object.keys(CATEGORY_ATLAS));
