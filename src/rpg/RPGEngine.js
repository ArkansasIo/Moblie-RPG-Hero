import {
  clamp, levelCurve, maxHp, physicalDamage, critChance, damageTaken,
  hitChance, itemPower, bossHp, bossDamage, threat
} from './rpgData.js';

export class RPGEngine {
  constructor(state = {}) {
    this.state = state;
    this.cooldowns = new Map();
    this.effects = new Map();
    this.quests = new Map();
    this.threatTables = new Map();
    this.events = [];
  }

  calculateStats(hero = {}) {
    const a = hero.attributes ?? {};
    const gear = hero.gearStats ?? {};
    return {
      maxHP: maxHp(a.VIT ?? 1, a.CON ?? 1, gear.HP ?? 0),
      physicalDamage: physicalDamage(a.STR ?? 1, gear.WeaponMultiplier ?? 1),
      critChance: critChance(a.DEX ?? 1, gear.CritChance ?? 0),
      armor: (a.CON ?? 0) + (gear.Armor ?? 0),
      magicResistance: (a.WIS ?? 0) + (gear.MagicResistance ?? 0),
      movementSpeed: 100 + (a.DEX ?? 0) * 0.5 + (gear.MoveSpeed ?? 0),
      power: itemPower(gear)
    };
  }

  gainExperience(entity, amount) {
    entity.xp = (entity.xp ?? 0) + Math.max(0, amount);
    let levels = 0;
    while ((entity.xp ?? 0) >= levelCurve((entity.level ?? 1) + 1)) {
      entity.level = (entity.level ?? 1) + 1;
      levels++;
      this.events.push({ type: 'level-up', entityId: entity.id, level: entity.level });
    }
    return levels;
  }

  rollAttack(attacker, defender, skill = {}) {
    const atk = this.calculateStats(attacker);
    const def = this.calculateStats(defender);
    if (Math.random() > hitChance(atk.accuracy ?? 1, def.evasion ?? 1)) return { hit: false, damage: 0 };
    const crit = Math.random() < atk.critChance;
    const raw = (skill.power ?? 1) * atk.physicalDamage * (crit ? 1 + (skill.critDamage ?? 1) : 1);
    const damage = Math.max(0, Math.round(damageTaken(raw, def.armor, def.resistance ?? 0, 1, defender.level ?? 1)));
    return { hit: true, crit, damage, type: skill.damageType ?? 'Physical' };
  }

  applyEffect(target, effect) {
    const id = effect.id ?? `${effect.type}:${target.id}`;
    const current = this.effects.get(id);
    const stacks = Math.min(effect.maxStacks ?? 1, (current?.stacks ?? 0) + (effect.stacks ?? 1));
    this.effects.set(id, { ...effect, targetId: target.id, stacks, expiresAt: Date.now() + (effect.durationMs ?? 0) });
    return this.effects.get(id);
  }

  tickEffects(now = Date.now()) {
    for (const [id, effect] of this.effects) {
      if (effect.expiresAt && now >= effect.expiresAt) this.effects.delete(id);
    }
  }

  setCooldown(id, seconds) { this.cooldowns.set(id, Date.now() + seconds * 1000); }
  cooldownReady(id) { return !this.cooldowns.has(id) || Date.now() >= this.cooldowns.get(id); }

  addThreat(enemyId, targetId, damage = 0, healing = 0, modifiers = {}) {
    const key = `${enemyId}:${targetId}`;
    const value = threat(damage, healing, modifiers.flatThreat ?? 0, modifiers.damageThreat ?? 1, modifiers.healingThreat ?? 0.5, modifiers.tauntOverride ?? 0);
    this.threatTables.set(key, (this.threatTables.get(key) ?? 0) + value);
    return this.threatTables.get(key);
  }

  selectThreatTarget(enemyId, candidates) {
    return candidates.map(target => ({ target, value: this.threatTables.get(`${enemyId}:${target.id}`) ?? 0 }))
      .sort((a, b) => b.value - a.value)[0]?.target ?? null;
  }

  scoreAbility(ability, context) {
    if (ability.cooldownId && !this.cooldownReady(ability.cooldownId)) return -Infinity;
    let score = ability.priority ?? 0;
    score += (ability.range ?? 0) >= (context.distance ?? 0) ? 20 : -50;
    score += (context.targetHpPct ?? 1) <= (ability.executeThreshold ?? 0) ? 40 : 0;
    score += ability.allowedPhases?.includes(context.phase) ? 25 : (ability.allowedPhases ? -100 : 0);
    score += (context.clusteredTargets ?? 0) * (ability.aoeWeight ?? 0);
    score += context.isThreatTarget ? (ability.threatTargetWeight ?? 0) : 0;
    return score;
  }

  chooseAbility(abilities, context) {
    return abilities.map(a => ({ ability: a, score: this.scoreAbility(a, context) }))
      .sort((a, b) => b.score - a.score)[0]?.ability ?? null;
  }

  scaleBoss(base, context) {
    return {
      hp: bossHp(base.hp, context.levelDiff ?? 0, context.players ?? 1, context.difficulty ?? 1),
      damage: bossDamage(base.damage, context.levelDiff ?? 0, context.difficulty ?? 1, context.players ?? 1)
    };
  }

  createLootRoll(table, context = {}) {
    const rolls = table?.rolls ?? 1;
    const output = [];
    for (let i = 0; i < rolls; i++) {
      const pool = (table.entries ?? []).filter(item => !item.requires || item.requires(context));
      if (!pool.length) continue;
      const total = pool.reduce((s, x) => s + (x.weight ?? 1), 0);
      let cursor = Math.random() * total;
      for (const item of pool) {
        cursor -= item.weight ?? 1;
        if (cursor <= 0) { output.push(structuredClone(item.item)); break; }
      }
    }
    return output;
  }

  startQuest(quest) { this.quests.set(quest.id, { ...quest, status: 'active', progress: {} }); return this.quests.get(quest.id); }
  updateQuest(id, objective, amount = 1) {
    const q = this.quests.get(id); if (!q) return null;
    q.progress[objective] = (q.progress[objective] ?? 0) + amount;
    return q;
  }
  completeQuest(id) { const q = this.quests.get(id); if (!q) return null; q.status = 'completed'; return q; }

  snapshot() {
    return { cooldowns: Object.fromEntries(this.cooldowns), effects: [...this.effects.values()], quests: [...this.quests.values()] };
  }
}
