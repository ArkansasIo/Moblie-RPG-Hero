import { canEquip, emptyEquipment } from '../rpg/equipmentData.js';

export class EquipmentSystem {
  static equip(character, item) {
    if (!item || !canEquip(item, character)) return { ok: false, character, reason: 'Item cannot be equipped.' };
    const equipment = { ...emptyEquipment(), ...(character.equipment ?? {}) };
    const slot = item.slot;
    const previous = equipment[slot] ?? null;
    equipment[slot] = item;
    return { ok: true, character: { ...character, equipment }, previous };
  }

  static unequip(character, slot) {
    const equipment = { ...emptyEquipment(), ...(character.equipment ?? {}) };
    const previous = equipment[slot] ?? null;
    equipment[slot] = null;
    return { ok: Boolean(previous), character: { ...character, equipment }, item: previous };
  }

  static calculatePower(character) {
    return Object.values(character?.equipment ?? {}).reduce((sum, item) => sum + Number(item?.power ?? 0), 0);
  }
}
