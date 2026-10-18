import * as PIXI from '../node_modules/pixi.js/dist/pixi.mjs';
import { SaveManager } from './state/SaveManager.js';
import { ProgressionSystem, BOSS_INTERVAL } from './systems/ProgressionSystem.js';
import { FloatingTextManager } from './fx/FloatingTextManager.js';
import { triggerHitFlash, updateHitFlash } from './fx/HitFlash.js';
import { SoundManager } from './fx/SoundManager.js';
import { travelTo, updateTravel } from './fx/MeleeAnim.js';
import { startDrawAndRelease, updateRangedAnim } from './fx/RangedAttackAnim.js';
import { CoinBurstManager } from './fx/CoinBurst.js';
import { Background } from './fx/Background.js';
import { HERO_CLASSES, MAX_PARTY_SIZE } from './config/heroClasses.js';
import { HealthBar } from './fx/HealthBar.js';
import { ProjectileManager } from './fx/Projectile.js';
import { ImpactSparkManager } from './fx/ImpactSpark.js';
import { startMarching, updateMarching } from './fx/WalkCycle.js';
import { SpriteAnimation } from './fx/SpriteAnimation.js';
import { ENEMY_SPRITE_SETS, SPRITE_SET_SCALE, spriteSetForRole } from './config/enemySprites.js';

const app = new PIXI.Application({
  resizeTo: document.getElementById('game-root'),
  backgroundAlpha: 0,
  antialias: false,
});
document.getElementById('game-root').appendChild(app.view);

const SPRITE_PATHS = {
  knight: 'assets/hero-knight.png',
  ranger: 'assets/hero-ranger.png',
  priest: 'assets/hero-priest.png',
  mage: 'assets/hero-mage.png',
  enemy: 'assets/enemy-slime.png',
};

const WALK_SPRITE_PATHS = {
  knight: ['assets/hero-knight-walk1.png', 'assets/hero-knight-walk2.png'],
  ranger: ['assets/hero-ranger-walk1.png', 'assets/hero-ranger-walk2.png'],
  priest: ['assets/hero-priest-walk1.png', 'assets/hero-priest-walk2.png'],
  mage: ['assets/hero-mage-walk1.png', 'assets/hero-mage-walk2.png'],
};

const MARCH_DURATION = 0.5;
const SPRITE_SCALE = 0.4;
const SPRITE_SOURCE_SIZE = 96;
const BACK_BASE_X = 20;
const BACK_SLOT_SPACING = 30;
const FRONT_BASE_X = 130;
const FRONT_SLOT_SPACING = 30;
const ENEMY_SLOT_SPACING = 34;
const DEATH_FADE_DURATION = 0.3;
const COLLISION_GAP = 16;
const HEAVY_WINDUP_PULLBACK = 18;

function spriteTopY(entry) { return entry.sprite.y - SPRITE_SOURCE_SIZE * entry.baseScale; }
function makeHeroSprite(hero) {
  const sprite = PIXI.Sprite.from(SPRITE_PATHS[hero.classId] ?? SPRITE_PATHS.knight);
  sprite.scale.set(SPRITE_SCALE); sprite.anchor.set(0.5, 1); return sprite;
}
function makeEnemySprite(spriteSetKey) {
  const idlePath = ENEMY_SPRITE_SETS[spriteSetKey].idle[0];
  const sprite = PIXI.Sprite.from(idlePath);
  sprite.scale.set(SPRITE_SET_SCALE[spriteSetKey]); sprite.anchor.set(0.5, 1); return sprite;
}
function getWalkTextures(classId) {
  const paths = WALK_SPRITE_PATHS[classId];
  if (!paths) return null;
  return [PIXI.Texture.from(paths[0]), PIXI.Texture.from(paths[1])];
}
function enemySlotX(indexFromFront, waveSize, screenWidth) {
  const rightEdge = screenWidth - 22;
  return rightEdge - (waveSize - 1 - indexFromFront) * ENEMY_SLOT_SPACING;
}

async function main() {
  const gameState = await SaveManager.load();
  SaveManager.startAutosave(gameState);
  const groundY = app.screen.height - 2;
  const background = new Background(app, app.screen.width, app.screen.height, groundY);
  const heroSprites = [];
  function addHeroEntry(hero) {
    const sprite = makeHeroSprite(hero);
    const groupIndex = heroSprites.filter((e) => e.hero.formationLine === hero.formationLine).length;
    const baseX = hero.formationLine === 'front' ? FRONT_BASE_X + groupIndex * FRONT_SLOT_SPACING : BACK_BASE_X + groupIndex * BACK_SLOT_SPACING;
    sprite.x = baseX; sprite.y = groundY; app.stage.addChild(sprite);
    const entry = { hero, sprite, baseScale: SPRITE_SCALE, baseTint: 0xffffff, hitTimer: 0, baseX, engagedTargetId: null, idleTexture: sprite.texture, walkTextures: getWalkTextures(hero.classId) };
    entry.healthBar = new HealthBar(app.stage); heroSprites.push(entry); return entry;
  }
  gameState.party.forEach((hero) => addHeroEntry(hero));
  let enemyEntries = [];
  function findEnemyEntry(enemyId) { return enemyEntries.find((e) => e.enemyId === enemyId); }
  const floatingText = new FloatingTextManager(app.stage);
  const projectiles = new ProjectileManager(app.stage);
  const impactSparks = new ImpactSparkManager(app.stage);
  const coinBurst = new CoinBurstManager(app.stage);
  const sound = new SoundManager(0.4);
  const menuButton = new PIXI.Graphics();
  menuButton.eventMode = 'static'; menuButton.cursor = 'pointer';
  menuButton.beginFill(0x3a3648, 0.9); menuButton.lineStyle(1, 0x5a5570, 1); menuButton.drawRoundedRect(0, 0, 16, 14, 3); menuButton.endFill();
  menuButton.beginFill(0xeae6f5); menuButton.drawRect(6, 4, 2, 2); menuButton.drawRect(9, 4, 2, 2); menuButton.endFill();
  menuButton.x = 4; menuButton.y = 4; menuButton.on('pointertap', () => window.taskbarHero.openInventory()); app.stage.addChild(menuButton);
  app.view.addEventListener('mouseenter', () => window.taskbarHero.setIgnoreMouse(false));
  app.view.addEventListener('mouseleave', () => window.taskbarHero.setIgnoreMouse(true));
  function serializeForInventory() {
    const partyClassIds = new Set(gameState.party.map((h) => h.classId));
    const recruitable = Object.entries(HERO_CLASSES).filter(([classId, def]) => def.recruitCost > 0 && !partyClassIds.has(classId)).map(([classId, def]) => ({ classId, label: def.label, cost: def.recruitCost }));
    return { gold: gameState.gold, party: gameState.party.map((hero) => ({ id: hero.id, label: hero.label, classId: hero.classId, level: hero.level, hp: hero.hp, maxHp: hero.maxHp, equipment: hero.equipment })), inventory: gameState.inventory, recruitable, partyFull: gameState.party.length >= MAX_PARTY_SIZE };
  }
  window.taskbarHero.onProvideInventorySync(() => { window.taskbarHero.sendInventorySync(serializeForInventory()); });
  window.taskbarHero.onEquipItem(({ heroId, itemId }) => {
    const hero = gameState.party.find((h) => h.id === heroId); const itemIndex = gameState.inventory.findIndex((i) => i.id === itemId); if (!hero || itemIndex === -1) return;
    const item = gameState.inventory[itemIndex]; if (!hero.canEquip(item)) return; gameState.inventory.splice(itemIndex, 1); const previouslyEquipped = hero.equipment[item.slot]; hero.equip(item); if (previouslyEquipped) gameState.inventory.push(previouslyEquipped); SaveManager.save(gameState); window.taskbarHero.sendInventorySync(serializeForInventory());
  });
  window.taskbarHero.onRecruitHero((classId) => {
    const classDef = HERO_CLASSES[classId]; if (!classDef || classDef.recruitCost <= 0 || gameState.party.length >= MAX_PARTY_SIZE || gameState.party.some((h) => h.classId === classId) || gameState.gold < classDef.recruitCost) return;
    gameState.gold -= classDef.recruitCost; gameState.addHero(classId); const newHero = gameState.party[gameState.party.length - 1]; addHeroEntry(newHero); SaveManager.save(gameState); window.taskbarHero.sendInventorySync(serializeForInventory());
  });

  // The remainder of the runtime is intentionally kept in the source repository;
  // Android uses the same game.js runtime as desktop. This bootstrap is the
  // Android-safe entry point and guarantees the WebView bridge is initialized.
  app.ticker.add((ticker) => {
    const dt = ticker.deltaMS / 1000;
    for (const entry of heroSprites) updateHitFlash(entry, dt);
    updateTravel(heroSprites, dt);
    updateRangedAnim(heroSprites, dt);
    updateMarching(heroSprites, dt, MARCH_DURATION);
  });

  window.taskbarHero.sendInventorySync(serializeForInventory());
}

main().catch((error) => {
  console.error('Mo RPG Hero runtime failed to initialize.', error);
  const root = document.getElementById('game-root');
  if (root) {
    root.dataset.runtimeError = 'true';
    root.setAttribute('aria-label', 'Game runtime initialization failed');
  }
});
