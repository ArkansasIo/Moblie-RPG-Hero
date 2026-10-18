import * as PIXI from '../../node_modules/pixi.js/dist/pixi.mjs';

const DEFAULT_FRAME_DURATION = 0.08;
const textureCache = new Map();
function loadTexture(path) {
  if (!textureCache.has(path)) textureCache.set(path, PIXI.Texture.from(path));
  return textureCache.get(path);
}

export class SpriteAnimation {
  constructor(sprite, framePathSets) {
    this.sprite = sprite;
    this.frameSets = {};
    for (const [name, paths] of Object.entries(framePathSets)) this.frameSets[name] = paths.map(loadTexture);
    this.current = null;
    this.frameIndex = 0;
    this.frameTimer = 0;
    this.loop = true;
    this.frameDuration = DEFAULT_FRAME_DURATION;
    this.onComplete = null;
  }

  play(name, { loop = true, onComplete = null, frameDuration = DEFAULT_FRAME_DURATION } = {}) {
    if (!this.frameSets[name]) return;
    this.current = name;
    this.frameIndex = 0;
    this.frameTimer = 0;
    this.loop = loop;
    this.onComplete = onComplete;
    this.frameDuration = frameDuration;
    this._applyFrame();
  }

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
      if (this.loop) this.frameIndex = 0;
      else {
        this.frameIndex = frames.length - 1;
        this._applyFrame();
        const cb = this.onComplete;
        this.onComplete = null;
        if (cb) cb();
        return;
      }
    }
    this._applyFrame();
  }
}
