import { MAX_LEVEL, requiredCharacterXP, totalCharacterXPForLevel, levelFromCharacterXP, getLevelProgression } from './characterData.js';

export const LEVEL_CAP = MAX_LEVEL;
export const LEVEL_BRACKET_SIZE = 60;

export function createProgressionState(xp = 0) {
  const safeXP = Math.max(0, Number(xp) || 0);
  const level = levelFromCharacterXP(safeXP);
  const previousTotal = totalCharacterXPForLevel(level);
  const nextXP = level >= MAX_LEVEL ? 0 : requiredCharacterXP(level);
  return {
    xp: safeXP,
    level,
    levelCap: MAX_LEVEL,
    levelProgress: Math.max(0, safeXP - previousTotal),
    nextLevelXP: nextXP,
    progression: getLevelProgression(level)
  };
}

export function grantCharacterXP(state, amount) {
  const next = createProgressionState((state?.xp ?? 0) + Math.max(0, Number(amount) || 0));
  return { ...state, ...next };
}

export function getLevelBracket(level) {
  const safe = Math.min(MAX_LEVEL, Math.max(1, Math.floor(level)));
  return Math.floor((safe - 1) / LEVEL_BRACKET_SIZE) + 1;
}

export function getPowerBudget(level, tier = 1) {
  const l = Math.min(MAX_LEVEL, Math.max(1, Number(level) || 1));
  const t = Math.max(1, Number(tier) || 1);
  return Math.floor(Math.pow(l, 1.18) * 100 * Math.pow(t, 0.35));
}
