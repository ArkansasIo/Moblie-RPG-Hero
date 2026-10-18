export const PIXEL_ASSETS = Object.freeze({
  heroes: './hero-atlas.svg',
  enemies: './enemy-atlas.svg',
  bosses: './boss-atlas.svg',
  npcs: './npc-atlas.svg',
  items: './item-atlas.svg',
  equipment: './equipment-atlas.svg',
  biomes: './biome-atlas.svg',
  world: './world-atlas.svg',
  dungeons: './dungeon-atlas.svg',
  props: './props-atlas.svg',
  effects: './effects-atlas.svg',
  ui: './ui-atlas.svg',
});

export const PIXEL_SCALE_PRESETS = Object.freeze([16, 24, 32, 48, 64, 96, 128]);

export const SPRITE_CATEGORIES = Object.freeze([
  'heroes', 'enemies', 'bosses', 'npcs', 'items', 'equipment',
  'biomes', 'world', 'dungeons', 'props', 'effects', 'ui',
]);

export function getPixelAsset(category) {
  return PIXEL_ASSETS[category] ?? null;
}

export function getPixelScale(size = 32) {
  return PIXEL_SCALE_PRESETS.includes(size) ? size : 32;
}
