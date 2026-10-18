import { createDefaultAttributes, getCharacterClass, MAX_LEVEL, requiredCharacterXP } from '../rpg/characterData.js';
import { deriveStats } from './StatsSystem.js';

export class CharacterSystem {
  static create(classId = 'warrior', name = 'Hero') {
    const classData = getCharacterClass(classId) ?? getCharacterClass('warrior');
    const attributes = createDefaultAttributes();
    return { id: `hero-${Date.now()}-${Math.floor(Math.random() * 10000)}`, name, classId: classData.id, level: 1, xp: 0, attributes, equipment: {}, talents: {}, stats: deriveStats(attributes) };
  }

  static addXP(character, amount) {
    let xp = Math.max(0, Number(amount) || 0);
    let level = Math.max(1, Number(character.level) || 1);
    while (level < MAX_LEVEL && xp >= requiredCharacterXP(level)) {
      xp -= requiredCharacterXP(level);
      level += 1;
    }
    const next = { ...character, level, xp };
    next.stats = deriveStats(next.attributes, next.equipment);
    return next;
  }

  static respec(character, attributes) {
    const next = { ...character, attributes: { ...createDefaultAttributes(), ...attributes } };
    next.stats = deriveStats(next.attributes, next.equipment);
    return next;
  }

  static validate(character) {
    return Boolean(character && getCharacterClass(character.classId) && character.level >= 1 && character.level <= MAX_LEVEL);
  }
}
