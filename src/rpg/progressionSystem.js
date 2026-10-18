import { MAX_LEVEL, requiredCharacterXP, totalCharacterXPForLevel, levelFromCharacterXP } from './characterData.js';

export const LEVEL_BRACKET_SIZE = 60;
export const WORLD_TIER_MAX = 9;

export function getLevelBracket(level) {
  const safe = Math.max(1, Math.min(MAX_LEVEL, Math.floor(level)));
  return Math.floor((safe - 1) / LEVEL_BRACKET_SIZE) + 1;
}

export function getLevelBracketLevel(level) {
  const safe = Math.max(1, Math.min(MAX_LEVEL, Math.floor(level)));
  return ((safe - 1) % LEVEL_BRACKET_SIZE) + 1;
}

export function getProgressionSnapshot(level, xp = totalCharacterXPForLevel(level)) {
  const safeLevel = Math.max(1, Math.min(MAX_LEVEL, Math.floor(level)));
  const total = Math.max(0, Number(xp) || 0);
  const next = requiredCharacterXP(safeLevel);
  const floor = totalCharacterXPForLevel(safeLevel);
  const progress = safeLevel >= MAX_LEVEL ? 1 : Math.max(0, Math.min(1, (total - floor) / next));
  return { level: safeLevel, maxLevel: MAX_LEVEL, bracket: getLevelBracket(safeLevel), bracketLevel: getLevelBracketLevel(safeLevel), totalXP: total, requiredXP: next, progress, percent: Math.round(progress * 10000) / 100, isMaxLevel: safeLevel === MAX_LEVEL };
}

export function addExperience(currentXP, amount) {
  const xp = Math.max(0, Number(currentXP) || 0) + Math.max(0, Number(amount) || 0);
  const level = levelFromCharacterXP(xp);
  return { xp, level, snapshot: getProgressionSnapshot(level, xp) };
}

export function getWorldTierForLevel(level) {
  const safe = Math.max(1, Math.min(MAX_LEVEL, Math.floor(level)));
  return Math.min(WORLD_TIER_MAX, Math.max(1, Math.ceil(safe / 80)));
}

export function getPowerBudget(level, tier = getWorldTierForLevel(level)) {
  const safeLevel = Math.max(1, Math.min(MAX_LEVEL, Math.floor(level)));
  const safeTier = Math.max(1, Math.min(WORLD_TIER_MAX, Math.floor(tier)));
  return Math.floor(100 + safeLevel * 12 + safeTier * 75 + Math.pow(safeLevel, 1.35));
}

export function isContentAppropriate(level, minLevel, maxLevel, tolerance = 20) {
  return level + tolerance >= minLevel && level - tolerance <= maxLevel;
}

export function buildLevelTable() {
  return Array.from({ length: MAX_LEVEL }, (_, i) => {
    const level = i + 1;
    return { level, bracket: getLevelBracket(level), bracketLevel: getLevelBracketLevel(level), xpToNext: requiredCharacterXP(level), totalXP: totalCharacterXPForLevel(level), worldTier: getWorldTierForLevel(level), powerBudget: getPowerBudget(level) };
  });
}
