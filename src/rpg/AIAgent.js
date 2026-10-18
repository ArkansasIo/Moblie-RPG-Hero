export const AI_STATES = ['Idle','Patrol','Alert','Engage','Combat','Retreat','Reset'];

export class AIAgent {
  constructor(profile = {}) {
    this.profile = profile;
    this.state = 'Idle';
    this.phase = 1;
    this.lastTargetId = null;
    this.memory = new Map();
    this.cooldowns = new Map();
  }

  transition(next) {
    if (!AI_STATES.includes(next)) throw new Error(`Invalid AI state: ${next}`);
    this.state = next;
    return this.state;
  }

  perceive(world) {
    const range = this.profile.detectionRange ?? 300;
    const targets = (world.targets ?? []).filter(t => this.distance(world.self, t) <= range && !t.dead);
    if (targets.length) this.transition(this.state === 'Idle' || this.state === 'Patrol' ? 'Alert' : this.state);
    return targets;
  }

  distance(a = {}, b = {}) { return Math.hypot((a.x ?? 0) - (b.x ?? 0), (a.y ?? 0) - (b.y ?? 0)); }

  chooseTarget(targets, context = {}) {
    const scored = targets.map(target => {
      let score = 0;
      score += (target.threat ?? 0) * (this.profile.threatWeight ?? 1);
      score += (1 - (target.hpPct ?? 1)) * (this.profile.lowHealthWeight ?? 0);
      score += target.isHealer ? (this.profile.healerPriority ?? 0) : 0;
      score += target.isPlayer ? (this.profile.playerPriority ?? 10) : 0;
      score += target.distance != null ? Math.max(0, (this.profile.range ?? 100) - target.distance) : 0;
      if (target.id === this.lastTargetId) score += this.profile.targetStickiness ?? 5;
      return { target, score };
    }).sort((a,b) => b.score - a.score);
    const target = scored[0]?.target ?? null;
    this.lastTargetId = target?.id ?? null;
    return target;
  }

  evaluateAbility(ability, context) {
    if (this.cooldowns.get(ability.id) > Date.now()) return -Infinity;
    if (ability.minRange != null && context.distance < ability.minRange) return -Infinity;
    if (ability.maxRange != null && context.distance > ability.maxRange) return -Infinity;
    if (ability.phases && !ability.phases.includes(this.phase)) return -Infinity;
    let score = ability.priority ?? 0;
    score += (context.targetHpPct ?? 1) <= (ability.executeThreshold ?? -1) ? 100 : 0;
    score += (context.targetCount ?? 1) >= (ability.aoeTargets ?? Infinity) ? (ability.aoeScore ?? 0) : 0;
    score += context.isUnderPressure ? (ability.defensiveScore ?? 0) : 0;
    score += context.targetIsHealer ? (ability.antiHealerScore ?? 0) : 0;
    score += context.phase === this.phase ? 10 : 0;
    return score;
  }

  chooseAbility(abilities, context) {
    return abilities.map(a => ({ a, score: this.evaluateAbility(a, context) }))
      .filter(x => Number.isFinite(x.score)).sort((a,b) => b.score - a.score)[0]?.a ?? null;
  }

  setCooldown(id, seconds) { this.cooldowns.set(id, Date.now() + seconds * 1000); }

  updateBossPhase(hpPct, triggers = [0.8, 0.6, 0.4, 0.2]) {
    const nextPhase = triggers.filter(t => hpPct <= t).length + 1;
    if (nextPhase !== this.phase) {
      this.phase = nextPhase;
      return { changed: true, phase: this.phase };
    }
    return { changed: false, phase: this.phase };
  }

  tick(world) {
    const targets = this.perceive(world);
    if (!targets.length) { this.transition('Patrol'); return { state: this.state }; }
    const target = this.chooseTarget(targets, world);
    this.transition('Combat');
    const context = world.buildAbilityContext?.(target, this) ?? { distance: this.distance(world.self, target), targetHpPct: target.hpPct ?? 1 };
    const ability = this.chooseAbility(this.profile.abilities ?? [], context);
    if (ability) this.setCooldown(ability.id, ability.cooldown ?? 1);
    return { state: this.state, target, ability, phase: this.phase };
  }
}
