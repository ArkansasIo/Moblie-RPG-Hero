import * as PIXI from 'pixi.js';
import { BOSS_INTERVAL } from '../config/waveConfig.js';

const BASE_SPEED = 12; // px/sec baseline scroll, sells constant forward travel
const BURST_DECAY = 140; // px/sec^2 - how fast a pulse's extra speed fades

const NORMAL_TINT = { r: 0x8a, g: 0x7a, b: 0xd1 };
const DANGER_TINT = { r: 0xe0, g: 0x48, b: 0x48 }; // matches the app's red accent

// One base tone per boss cycle (stages 1-9 = tier 0, 11-19 = tier 1, ...),
// cycling once you run out - gives each stretch of the run a distinct feel
// even before the danger-tint blend kicks in near the next boss. Tuned as
// multiplicative tints against the floor art's own colors (see
// _buildFloorLayer), so keep these reasonably close to white/neutral rather
// than pure hues - tint MULTIPLIES the texture, it doesn't replace it.
const FLOOR_TIER_PALETTE = [
  { r: 0xff, g: 0xff, b: 0xff }, // tier 0: neutral dirt path (no shift - the original look)
  { r: 0xb2, g: 0xff, b: 0xb0 }, // tier 1: mossy/grassy
  { r: 0xff, g: 0xe0, b: 0xa0 }, // tier 2: sandy/desert
  { r: 0xa8, g: 0xd8, b: 0xff }, // tier 3: icy/frost
  { r: 0xff, g: 0xa8, b: 0xa0 }, // tier 4: volcanic/ash
];

function lerpColor(from, to, t) {
  const r = Math.round(from.r + (to.r - from.r) * t);
  const g = Math.round(from.g + (to.g - from.g) * t);
  const b = Math.round(from.b + (to.b - from.b) * t);
  return (r << 16) + (g << 8) + b;
}

/**
 * A subtle parallax scroller: distant hill silhouettes (slow) and a proper
 * floor band (fast, closest to camera) that the hero/enemy sprites visually
 * stand on. Deliberately kept semi-transparent and partial-height - the
 * strip's transparency (blending with the desktop) is part of the original
 * design, so this adds a sense of motion and ground without turning the
 * window into an opaque scene. The floor uses real art (src/assets/floor-
 * tile.png); the hills are still procedurally drawn.
 */
export class Background {
  constructor(app, screenWidth, screenHeight, groundY) {
    this.burstSpeed = 0;

    this.hillLayer = this._buildHillLayer(app, screenWidth);
    this.floorLayer = this._buildFloorLayer(app, screenWidth, groundY);

    // Insert behind everything else already on stage (index 0 = bottom).
    app.stage.addChildAt(this.floorLayer, 0);
    app.stage.addChildAt(this.hillLayer, 0);
  }

  _buildHillLayer(app, screenWidth) {
    const tileW = 60;
    const tileH = 16;
    const gfx = new PIXI.Graphics();
    gfx.beginFill(0xffffff, 1); // tinted at runtime via .tint
    gfx.moveTo(0, tileH);
    const steps = 24;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * tileW;
      // One full sine period across the tile width -> seamless tiling.
      const y = tileH - 6 - Math.sin((i / steps) * Math.PI * 2) * 5;
      gfx.lineTo(x, y);
    }
    gfx.lineTo(tileW, tileH);
    gfx.closePath();
    gfx.endFill();

    const texture = app.renderer.generateTexture(gfx);
    gfx.destroy();

    const layer = new PIXI.TilingSprite(texture, screenWidth + tileW, tileH);
    layer.y = 6;
    layer.alpha = 0.22;
    layer.tint = (NORMAL_TINT.r << 16) + (NORMAL_TINT.g << 8) + NORMAL_TINT.b;
    return layer;
  }

  _buildFloorLayer(app, screenWidth, groundY) {
    // Real hand-drawn floor art (src/assets/floor-tile.png, 310x16, grass
    // top / dirt bottom, transparent background) - replaces the earlier
    // procedurally-drawn strip. The left/right edges have an irregular
    // grass-tuft silhouette rather than a flat line, which is what makes
    // the tile boundary read as organic instead of an obvious hard seam.
    //
    // Dimensions are hardcoded rather than read from texture.width/height -
    // image loading is async, so those can still be 0 at this exact
    // synchronous moment. The actual tiling pattern uses the real loaded
    // texture regardless; this only affects the extra padding added to the
    // TilingSprite's display width for seamless edge scrolling.
    const tileW = 310;
    const tileH = 16;
    const texture = PIXI.Texture.from('assets/floor-tile.png');

    const layer = new PIXI.TilingSprite(texture, screenWidth + tileW, tileH);
    // Align the grass surface (not the image's top edge, which starts with
    // a couple of fully-transparent rows) close to groundY, so character
    // feet read as standing on the grass line rather than floating above it
    // or buried in the dirt band below - the window's only 48px tall, so
    // the deeper dirt rows mostly clip below the visible area, which is fine.
    layer.y = groundY - 5;
    layer.alpha = 0.6;
    return layer;
  }

  /** Call once when a stage transitions (enemy defeated) - a quick speed burst
   * that decays back to baseline, selling "we just moved on to the next fight." */
  pulse() {
    this.burstSpeed = 70;
  }

  /**
   * Call with the current stage number whenever it changes (wave-spawned).
   * Two things happen together:
   *  - The hill layer shifts from its normal purple toward danger red as
   *    the stage approaches the next boss (unchanged from before).
   *  - The floor layer's BASE tone changes once per boss cycle (tier =
   *    floor(stage / BOSS_INTERVAL), see FLOOR_TIER_PALETTE) - a different
   *    "biome" feel per stretch of the run - and *also* blends toward that
   *    same danger red as the boss approaches, same as the hills.
   */
  setStage(stage) {
    const proximity = Math.max(0, Math.min(1, (stage % BOSS_INTERVAL) / BOSS_INTERVAL));
    this.hillLayer.tint = lerpColor(NORMAL_TINT, DANGER_TINT, proximity);

    const tier = Math.floor(stage / BOSS_INTERVAL) % FLOOR_TIER_PALETTE.length;
    const tierBase = FLOOR_TIER_PALETTE[tier];
    this.floorLayer.tint = lerpColor(tierBase, DANGER_TINT, proximity);
  }

  update(deltaSeconds) {
    this.burstSpeed = Math.max(0, this.burstSpeed - BURST_DECAY * deltaSeconds);
    const speed = BASE_SPEED + this.burstSpeed;

    this.hillLayer.tilePosition.x -= speed * 0.4 * deltaSeconds; // slower = further away
    this.floorLayer.tilePosition.x -= speed * deltaSeconds;
  }
}
