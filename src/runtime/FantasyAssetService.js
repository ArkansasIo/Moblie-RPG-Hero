import { ASSET_MANIFEST, FANTASY_STYLE, resolveAsset } from '../data/assetRegistry.js';

const CATEGORY_ASSET = Object.freeze({
  heroes: ASSET_MANIFEST.atlases.hero,
  races: ASSET_MANIFEST.atlases.hero,
  weapons: ASSET_MANIFEST.fantasy.equipment,
  armor: ASSET_MANIFEST.fantasy.equipment,
  equipment: ASSET_MANIFEST.fantasy.equipment,
  items: ASSET_MANIFEST.atlases.item,
  spells: ASSET_MANIFEST.atlases.effects,
  skills: ASSET_MANIFEST.atlases.effects,
  status: ASSET_MANIFEST.atlases.effects,
  monsters: ASSET_MANIFEST.fantasy.monsters,
  bosses: ASSET_MANIFEST.fantasy.monsters,
  biomes: ASSET_MANIFEST.fantasy.biomes,
  dungeons: ASSET_MANIFEST.atlases.dungeon,
  tower: ASSET_MANIFEST.atlases.tower,
  world: ASSET_MANIFEST.atlases.world,
  ui: ASSET_MANIFEST.atlases.ui,
  classes: ASSET_MANIFEST.fantasy.classes,
  fantasySheet: ASSET_MANIFEST.atlases.dnd5e,
});

export function getFantasyCategoryAsset(category) {
  return resolveAsset(CATEGORY_ASSET[category] ?? CATEGORY_ASSET.fantasySheet);
}

export function getFantasyTheme() { return FANTASY_STYLE; }
export function getFantasyAssetManifest() { return ASSET_MANIFEST; }

export function createFantasyAssetDescriptor(category, id, options = {}) {
  return Object.freeze({category,id,atlas:getFantasyCategoryAsset(category),style:FANTASY_STYLE.theme,rarity:options.rarity ?? 'common',scale:options.scale ?? 1,frame:options.frame ?? 0});
}

export const FANTASY_ASSET_CATEGORIES = Object.freeze(Object.keys(CATEGORY_ASSET));
