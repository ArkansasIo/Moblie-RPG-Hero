export const QUEST_TYPES = Object.freeze(['main','side','daily','weekly','achievement']);

export function createQuest(definition) {
  return {
    id: definition.id,
    type: definition.type ?? 'side',
    name: definition.name ?? definition.id,
    description: definition.description ?? '',
    objectives: (definition.objectives ?? []).map((objective) => ({ ...objective, progress: 0 })),
    rewards: definition.rewards ?? {},
    state: 'available',
  };
}

export function advanceObjective(quest, objectiveId, amount = 1) {
  const next = structuredClone(quest);
  const objective = next.objectives.find((entry) => entry.id === objectiveId);
  if (!objective || next.state === 'complete') return next;
  objective.progress = Math.min(objective.required ?? 1, objective.progress + Math.max(0, amount));
  if (next.objectives.length && next.objectives.every((entry) => entry.progress >= (entry.required ?? 1))) next.state = 'complete';
  else if (next.state === 'available') next.state = 'active';
  return next;
}

export function claimQuest(quest) {
  if (quest.state !== 'complete') return { quest, claimed: false, reason: 'not-complete' };
  const next = structuredClone(quest);
  next.state = 'claimed';
  return { quest: next, claimed: true, rewards: next.rewards };
}
