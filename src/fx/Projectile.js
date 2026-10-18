import * as PIXI from '../../node_modules/pixi.js/dist/pixi.mjs';

const TRAVEL_DURATION = 0.18; // seconds - just the flight, not a round trip like a melee lunge

export class ProjectileManager {
  constructor(stage) {
    this.stage = stage;
    this.active = [];
  }

  spawn(fromX, fromY, toX, toY, color, onArrive) {
    const gfx = new PIXI.Graphics();
    gfx.beginFill(color);
    gfx.drawCircle(0, 0, 1.6);
    gfx.endFill();
    gfx.x = fromX;
    gfx.y = fromY;
    this.stage.addChild(gfx);
    this.active.push({ gfx, fromX, fromY, toX, toY, timer: 0, onArrive });
  }

  update(deltaSeconds) {
    for (let i = this.active.length - 1; i >= 0; i--) {
      const p = this.active[i];
      p.timer += deltaSeconds;
      const t = Math.min(1, p.timer / TRAVEL_DURATION);
      p.gfx.x = p.fromX + (p.toX - p.fromX) * t;
      p.gfx.y = p.fromY + (p.toY - p.fromY) * t;
      if (t >= 1) {
        this.stage.removeChild(p.gfx);
        p.gfx.destroy();
        this.active.splice(i, 1);
        if (p.onArrive) p.onArrive();
      }
    }
  }
}
