export function createAbility(id, definition = {}) {
  return { id, name: definition.name ?? id, type: definition.type ?? 'damage', power: definition.power ?? 1, cooldownMs: definition.cooldownMs ?? 1000, resourceCost: definition.resourceCost ?? 0, range: definition.range ?? 100, effects: definition.effects ?? [] };
}

export function canCast(ability, actor, now = Date.now()) {
  const resource = actor.resources?.mana ?? actor.resources?.energy ?? 0;
  const lastCast = actor.cooldowns?.[ability.id] ?? -Infinity;
  return resource >= ability.resourceCost && now - lastCast >= ability.cooldownMs;
}

export function castAbility(ability, actor, target, now = Date.now()) {
  if (!canCast(ability, actor, now)) return { success:false, reason:'cooldown-or-resource' };
  const next = structuredClone(actor);
  next.cooldowns ??= {};
  next.resources ??= { mana:0 };
  const resourceKey = Object.hasOwn(next.resources, 'mana') ? 'mana' : 'energy';
  next.resources[resourceKey] = Math.max(0, next.resources[resourceKey] - ability.resourceCost);
  next.cooldowns[ability.id] = now;
  const damage = Math.max(0, Math.floor((next.stats?.attack ?? 1) * ability.power));
  return { success:true, actor:next, target, damage, effects:ability.effects };
}
