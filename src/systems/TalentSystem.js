export const TALENT_TREES = Object.freeze({
  guardian: [
    { id: 'ironWill', name: 'Iron Will', cost: 1, maxRank: 5, effect: { armorPct: 0.02 } },
    { id: 'shieldMastery', name: 'Shield Mastery', cost: 2, maxRank: 5, effect: { blockPct: 0.03 } },
    { id: 'unyielding', name: 'Unyielding', cost: 3, maxRank: 3, effect: { hpPct: 0.05 } },
  ],
  ranger: [
    { id: 'deadeye', name: 'Deadeye', cost: 1, maxRank: 5, effect: { critPct: 0.02 } },
    { id: 'rapidDraw', name: 'Rapid Draw', cost: 2, maxRank: 5, effect: { hastePct: 0.02 } },
    { id: 'predator', name: 'Predator', cost: 3, maxRank: 3, effect: { damagePct: 0.05 } },
  ],
  arcanist: [
    { id: 'arcaneFocus', name: 'Arcane Focus', cost: 1, maxRank: 5, effect: { spellPowerPct: 0.03 } },
    { id: 'manaFlow', name: 'Mana Flow', cost: 2, maxRank: 5, effect: { manaRegenPct: 0.04 } },
    { id: 'overcharge', name: 'Overcharge', cost: 3, maxRank: 3, effect: { damagePct: 0.06 } },
  ],
});

export function createTalentState() {
  return { points: 0, ranks: {} };
}

export function spendTalentPoint(state, classId, talentId) {
  const tree = TALENT_TREES[classId] ?? [];
  const talent = tree.find((entry) => entry.id === talentId);
  if (!talent || state.points < talent.cost) return state;
  const current = state.ranks[talentId] ?? 0;
  if (current >= talent.maxRank) return state;
  return { points: state.points - talent.cost, ranks: { ...state.ranks, [talentId]: current + 1 } };
}

export function talentBonuses(state, classId) {
  const tree = TALENT_TREES[classId] ?? [];
  const bonuses = {};
  for (const talent of tree) {
    const rank = state.ranks[talent.id] ?? 0;
    for (const [key, value] of Object.entries(talent.effect)) bonuses[key] = (bonuses[key] ?? 0) + value * rank;
  }
  return bonuses;
}
