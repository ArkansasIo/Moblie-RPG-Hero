import * as PIXI from 'pixi.js';

const DEFAULT_FRAME_DURATION = 0.08; // ~12fps - readable for small pixel-art frames without looking too slow

// Caches PIXI.Texture objects by path so repeated animations (idle/walk
// looping constantly) don't rebuild the frames array from path strings
// every time an entry is created.
const textureCache = new Map();
function loadTexture(path) {
  if (!textureCache.has(path)) {
    textureCache.set(path, PIXI.Texture.from(path));
  }
  return textureCache.get(path);
}

/**
 * Drives a sprite through a named animation (idle/walk/attack/dead/...) by
 * swapping its texture on a fixed frame interval. One instance per
 * animated entity - construct with a { idle: [...paths], walk: [...], ... }
 * frame-path map (see config/enemySprites.js), then call play()/update()
 * from the owner's own lifecycle (game.js).
 */
export class SpriteAnimation {
  constructor(sprite, framePathSets) {
    this.sprite = sprite;
    this.frameSets = {};
    for (const [name, paths] of Object.entries(framePathSets)) {
      this.frameSets[name] = paths.map(loadTexture);
    }
    this.current = null;
    this.frameIndex = 0;
    this.frameTimer = 0;
    this.loop = true;
    this.frameDuration = DEFAULT_FRAME_DURATION;
    this.onComplete = null;
  }

  /**
   * Starts (or restarts) an animation by name. `loop: false` plays once and
   * holds the last frame, calling `onComplete` exactly once when it finishes -
   * use that to chain back to 'idle' after an attack/death animation.
   */
  play(name, { loop = true, onComplete = null, frameDuration = DEFAULT_FRAME_DURATION } = {}) {
    if (!this.frameSets[name]) return; // no frames registered for this name - no-op, not a crash
    this.current = name;
    this.frameIndex = 0;
    this.frameTimer = 0;
    this.loop = loop;
    this.onComplete = onComplete;
    this.frameDuration = frameDuration;
    this._applyFrame();
  }

  /** Total duration (seconds) of the named animation at its default frame
   * rate - useful for syncing something else (e.g. a death-fade) to how
   * long the animation actually takes, since frame counts vary a lot
   * between sprite sets (a 4-frame death vs a 13-frame one). */
  durationOf(name, frameDuration = DEFAULT_FRAME_DURATION) {
    const frames = this.frameSets[name];
    return frames ? frames.length * frameDuration : 0;
  }

  _applyFrame() {
    const frames = this.frameSets[this.current];
    if (!frames || frames.length === 0) return;
    this.sprite.texture = frames[this.frameIndex];
  }

  update(deltaSeconds) {
    if (!this.current) return;
    const frames = this.frameSets[this.current];
    if (!frames || frames.length === 0) return;

    this.frameTimer += deltaSeconds;
    if (this.frameTimer < this.frameDuration) return;
    this.frameTimer -= this.frameDuration;
    this.frameIndex += 1;

    if (this.frameIndex >= frames.length) {
      if (this.loop) {
        this.frameIndex = 0;
      } else {
        this.frameIndex = frames.length - 1; // hold on the last frame
        this._applyFrame();
        const cb = this.onComplete;
        this.onComplete = null; // fire once only
        if (cb) cb();
        return;
      }
    }
    this._applyFrame();
  }
}
