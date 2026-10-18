import { GameState } from '../state/GameState.js';
import { ProgressionSystem } from '../systems/ProgressionSystem.js';
import { CombatSystem } from '../systems/CombatSystem.js';
import { WaveSystem } from '../systems/WaveSystem.js';
import { generateLoot } from '../config/lootTables.js';
import { getZone, getDungeon, getRaid, getTowerFloor, availableZones, availableDungeons, availableRaids } from './ContentService.js';
import { getFloor, canEnterFloor } from '../data/tower.js';

export class MobileGameRuntime {
  constructor(state = new GameState()) {
    this.state = state;
    this.listeners = new Set();
    this.running = false;
    this.lastTick = 0;
  }

  onEvent(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit(event) {
    for (const listener of this.listeners) listener(event);
  }

  tick(seconds = 0.25) {
    ProgressionSystem.simulate(this.state, Math.max(0, seconds), {
      allowChests: true,
      step: Math.min(0.25, Math.max(0.01, seconds)),
      onEvent: (event) => this.emit(event),
    });
    this.lastTick = Date.now();
    return this.snapshot();
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTick = performance.now();
    const loop = (now) => {
      if (!this.running) return;
      const dt = Math.min(0.5, Math.max(0, (now - this.lastTick) / 1000));
      this.lastTick = now;
      this.tick(dt);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  stop() { this.running = false; }

  snapshot() {
    return {
      stage: this.state.stage,
      gold: this.state.gold,
      party: this.state.party.map((hero) => ({ id:hero.id, classId:hero.classId, label:hero.label, level:hero.level, hp:hero.hp, maxHp:hero.maxHp, atk:hero.atk, armor:hero.armor, equipment:hero.equipment })),
      inventory: [...this.state.inventory],
      enemies: this.state.enemies.map((enemy) => ({ id:enemy.id, role:enemy.role, hp:enemy.hp, maxHp:enemy.maxHp, atk:enemy.atk, armor:enemy.armor, enraged:enemy.enraged })),
    };
  }

  travel(zoneId) {
    const zone = getZone(zoneId);
    if (!zone) return { ok:false, reason:'unknown-zone' };
    const level = Math.max(...this.state.party.map((hero) => hero.level));
    if (!availableZones(level).some((entry) => entry.id === zoneId)) return { ok:false, reason:'level-required' };
    this.state.location = { zoneId, x:0.5, y:0.5 };
    this.emit({ type:'zone-changed', zone });
    return { ok:true, zone };
  }

  beginDungeon(dungeonId) {
    const dungeon = getDungeon(dungeonId);
    const level = Math.max(...this.state.party.map((hero) => hero.level));
    if (!dungeon) return { ok:false, reason:'unknown-dungeon' };
    if (!availableDungeons(level).some((entry) => entry.id === dungeonId)) return { ok:false, reason:'level-required' };
    this.state.activeDungeon = { dungeonId, encounter:0, encounters:dungeon.rooms ?? dungeon.bosses?.length ?? 1, startedAt:Date.now() };
    this.emit({ type:'dungeon-started', dungeon });
    return { ok:true, dungeon };
  }

  beginRaid(raidId) {
    const raid = getRaid(raidId);
    const level = Math.max(...this.state.party.map((hero) => hero.level));
    if (!raid) return { ok:false, reason:'unknown-raid' };
    if (!availableRaids(level).some((entry) => entry.id === raidId)) return { ok:false, reason:'level-required' };
    this.state.activeRaid = { raidId, wing:0, startedAt:Date.now() };
    this.emit({ type:'raid-started', raid });
    return { ok:true, raid };
  }

  enterTower(floor) {
    const target = getFloor(floor);
    const level = Math.max(...this.state.party.map((hero) => hero.level));
    if (!target || !canEnterFloor(level, floor)) return { ok:false, reason:'level-required' };
    this.state.towerFloor = floor;
    this.emit({ type:'tower-floor-entered', floor:target });
    return { ok:true, floor:target };
  }

  grantLoot(level = 1) {
    const item = generateLoot(level);
    this.state.inventory.push(item);
    this.emit({ type:'loot-drop', item });
    return item;
  }

  resolveCombat(seconds = 1) {
    if (!this.state.enemies.length) this.state.enemies = WaveSystem.spawnWave(this.state.stage);
    const result = CombatSystem.resolveTick(this.state.party, this.state.enemies, seconds);
    for (const event of result.events) this.emit(event);
    return result;
  }
}

export function createMobileRuntime(state) { return new MobileGameRuntime(state); }
