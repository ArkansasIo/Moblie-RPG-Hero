import * as PIXI from '../../node_modules/pixi.js/dist/pixi.mjs';

const BAR_WIDTH = 22;
const BAR_HEIGHT = 3;
const GAP_ABOVE_SPRITE = 4; // px between the sprite's visual top and the bar

const LOW = { r: 0xe0, g: 0x48, b: 0x48 }; // red, matches the app's danger accent
const MID = { r: 0xe0, g: 0xc0, b: 0x48 }; // yellow
const HIGH = { r: 0x5f, g: 0xd6, b: 0x6a }; // green

function lerpColor(from, to, t) {
  const r = Math.round(from.r + (to.r - from.r) * t);
  const g = Math.round(from.g + (to.g - from.g) * t);
  const b = Math.round(from.b + (to.b - from.b) * t);
  return (r << 16) + (g << 8) + b;
}

function colorForFraction(t) {
  return t > 0.5 ? lerpColor(MID, HIGH, (t - 0.5) * 2) : lerpColor(LOW, MID, t * 2);
}

export class HealthBar {
  constructor(stage) {
    this.container = new PIXI.Container();
    this.back = new PIXI.Graphics();
    this.back.beginFill(0x100e17, 0.75);
    this.back.drawRect(0, 0, BAR_WIDTH, BAR_HEIGHT);
    this.back.endFill();
    this.fill = new PIXI.Graphics();
    this.container.addChild(this.back);
    this.container.addChild(this.fill);
    stage.addChild(this.container);
  }

  update(hpFraction, centerX, spriteTopY) {
    const frac = Math.max(0, Math.min(1, hpFraction));
    this.fill.clear();
    this.fill.beginFill(colorForFraction(frac));
    this.fill.drawRect(0, 0, BAR_WIDTH * frac, BAR_HEIGHT);
    this.fill.endFill();
    this.container.x = centerX - BAR_WIDTH / 2;
    this.container.y = Math.max(1, spriteTopY - BAR_HEIGHT - GAP_ABOVE_SPRITE);
    this.container.visible = frac > 0;
  }

  destroy() {
    this.container.destroy({ children: true });
  }
}
