export const PIXEL_ASSETS = Object.freeze({
  heroes: { knight:'assets/hero-knight.png', ranger:'assets/hero-ranger.png', priest:'assets/hero-priest.png', mage:'assets/hero-mage.png' },
  enemies: { slime:'assets/enemy-slime.png' },
  atlases: { hero:'assets/pixel/hero-atlas.svg', enemy:'assets/pixel/enemy-atlas.svg', item:'assets/pixel/item-atlas.svg', biome:'assets/pixel/biome-atlas.svg', ui:'assets/pixel/ui-atlas.svg' },
});

export function assetPath(group, key) { return PIXEL_ASSETS[group]?.[key] ?? null; }
export function hasAsset(group, key) { return Boolean(assetPath(group, key)); }
