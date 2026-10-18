import { getProfession, validateProfessionProgress } from '../rpg/professions.js';

export class ProfessionSystem {
  static createState() { return {}; }

  static addXP(state, professionId, amount) {
    const profession = getProfession(professionId);
    if (!profession) return { ...state };
    const current = state[professionId] ?? { level: 1, xp: 0 };
    let level = Math.max(1, current.level);
    let xp = Math.max(0, current.xp + Math.floor(Number(amount) || 0));
    while (level < 100) {
      const required = profession.xp?.requiredForNextLevel ? profession.xp.requiredForNextLevel(level) : Math.floor(level ** 2 * 100);
      if (xp < required) break;
      xp -= required;
      level += 1;
    }
    const next = { ...state, [professionId]: { level, xp } };
    validateProfessionProgress(next);
    return next;
  }

  static canUse(state, professionId, requiredLevel = 1) {
    return Number(state?.[professionId]?.level ?? 0) >= requiredLevel && Boolean(getProfession(professionId));
  }
}
