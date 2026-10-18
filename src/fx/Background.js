import * as PIXI from '../../node_modules/pixi.js/dist/pixi.mjs';
import { BOSS_INTERVAL } from '../config/waveConfig.js';

const BASE_SPEED = 12;
const BURST_DECAY = 140;
const NORMAL_TINT = { r: 0x8a, g: 0x7a, b: 0xd1 };
const DANGER_TINT = { r: 0xe0, g: 0x48, b: 0x48 };
const FLOOR_TIER_PALETTE = [
  { r: 0xff, g: 0xff, b: 0xff },
  { r: 0xb2, g: 0xff, b: 0xb0 },
  { r: 0xff, g: 0xe0, b: 0xa0 },
  { r: 0xa8, g: 0xd8, b: 0xff },
  { r: 0xff, g: 0xa8, b: 0xa0 },
];

function lerpColor(from, to, t) {
  const r = Math.round(from.r + (to.r - from.r) * t);
  const g = Math.round(from.g + (to.g - from.g) * t);
  const b = Math.round(from.b + (to.b - from.b) * t);
  return (r << 16) + (g << 8) + b;
}

export class Background {
  constructor(app, screenWidth, screenHeight, groundY) {
    this.burstSpeed = 0;
    this.hillLayer = this._buildHillLayer(app, screenWidth);
    this.floorLayer = this._buildFloorLayer(app, screenWidth, groundY);
    app.stage.addChildAt(this.floorLayer, 0);
    app.stage.addChildAt(this.hillLayer, 0);
  }

  _buildHillLayer(app, screenWidth) {
    const tileW = 60;
    const tileH = 16;
    const gfx = new PIXI.Graphics();
    gfx.beginFill(0xffffff, 1);
    gfx.moveTo(0, tileH);
    const steps = 24;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * tileW;
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
    const tileW = 310;
    const tileH = 16;
    const texture = PIXI.Texture.from('assets/floor-tile.png');
    const layer = new PIXI.TilingSprite(texture, screenWidth + tileW, tileH);
    layer.y = groundY - 5;
    layer.alpha = 0.6;
    return layer;
  }

  pulse() {
    this.burstSpeed = 70;
  }

  setStage(stage) {
    const proximity = Math.max(0, Math.min(1, (stage % BOSS_INTERVAL) / BOSS_INTERVAL));
    this.hillLayer.tint = lerpColor(NORMAL_TINT, DANGER_TINT, proximity);
    const tier = Math.floor(stage / BOSS_INTERVAL) % FLOOR_TIER_PALETTE.length;
    this.floorLayer.tint = lerpColor(FLOOR_TIER_PALETTE[tier], DANGER_TINT, proximity);
  }

  update(deltaSeconds) {
    this.burstSpeed = Math.max(0, this.burstSpeed - BURST_DECAY * deltaSeconds);
    const speed = BASE_SPEED + this.burstSpeed;
    this.hillLayer.tilePosition.x -= speed * 0.4 * deltaSeconds;
    this.floorLayer.tilePosition.x -= speed * deltaSeconds;
  }
}
