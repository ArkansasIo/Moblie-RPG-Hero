import * as PIXI from '../../node_modules/pixi.js/dist/pixi.mjs';

const RISE_SPEED = 18;
const LIFETIME = 0.7;
const STYLE_CACHE = {};

function styleFor(color) {
  if (!STYLE_CACHE[color]) {
    STYLE_CACHE[color] = new PIXI.TextStyle({
      fontFamily: 'Arial, sans-serif',
      fontSize: 10,
      fontWeight: 'bold',
      fill: color,
      stroke: 0x000000,
      strokeThickness: 2,
    });
  }
  return STYLE_CACHE[color];
}

export class FloatingTextManager {
  constructor(stage) {
    this.stage = stage;
    this.active = [];
  }

  spawn(x, y, text, color = 0xffffff) {
    const label = new PIXI.Text(text, styleFor(color));
    label.anchor.set(0.5, 1);
    label.x = x + (Math.random() * 10 - 5);
    label.y = y;
    this.stage.addChild(label);
    this.active.push({ label, life: LIFETIME });
  }

  update(deltaSeconds) {
    for (let i = this.active.length - 1; i >= 0; i--) {
      const entry = this.active[i];
      entry.life -= deltaSeconds;
      entry.label.y -= RISE_SPEED * deltaSeconds;
      entry.label.alpha = Math.max(0, entry.life / LIFETIME);
      if (entry.life <= 0) {
        this.stage.removeChild(entry.label);
        entry.label.destroy();
        this.active.splice(i, 1);
      }
    }
  }
}
