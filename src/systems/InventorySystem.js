import { ITEM_CATALOG } from '../config/items.js';

export const EQUIPMENT_SLOTS = Object.freeze(['weapon', 'offhand', 'head', 'chest', 'hands', 'legs', 'feet', 'ring', 'amulet', 'relic']);

export function createInventory(slotCount = 60) {
  return { slotCount: Math.max(1, slotCount), items: [], equipped: Object.fromEntries(EQUIPMENT_SLOTS.map((slot) => [slot, null])) };
}

export function findItemDefinition(itemId) {
  return ITEM_CATALOG?.[itemId] ?? null;
}

export function addItem(inventory, itemId, quantity = 1) {
  const definition = findItemDefinition(itemId);
  if (!definition || quantity <= 0) return { inventory, added: 0, reason: 'invalid-item' };
  const next = structuredClone(inventory);
  const maxStack = definition.stack ?? 1;
  let remaining = Math.floor(quantity);
  for (const stack of next.items.filter((item) => item.itemId === itemId)) {
    const space = maxStack - stack.quantity;
    const amount = Math.min(space, remaining);
    stack.quantity += amount;
    remaining -= amount;
    if (!remaining) break;
  }
  while (remaining > 0 && next.items.length < next.slotCount) {
    const amount = Math.min(maxStack, remaining);
    next.items.push({ instanceId: crypto.randomUUID(), itemId, quantity: amount });
    remaining -= amount;
  }
  return { inventory: next, added: quantity - remaining, reason: remaining ? 'inventory-full' : 'ok' };
}

export function removeItem(inventory, itemId, quantity = 1) {
  const next = structuredClone(inventory);
  let remaining = Math.max(0, Math.floor(quantity));
  for (let i = next.items.length - 1; i >= 0 && remaining > 0; i--) {
    const stack = next.items[i];
    if (stack.itemId !== itemId) continue;
    const amount = Math.min(stack.quantity, remaining);
    stack.quantity -= amount;
    remaining -= amount;
    if (stack.quantity <= 0) next.items.splice(i, 1);
  }
  return { inventory: next, removed: quantity - remaining, reason: remaining ? 'insufficient-items' : 'ok' };
}

export function equipItem(inventory, instanceId) {
  const next = structuredClone(inventory);
  const index = next.items.findIndex((item) => item.instanceId === instanceId);
  if (index < 0) return { inventory, success: false, reason: 'item-not-found' };
  const item = findItemDefinition(next.items[index].itemId);
  const slot = item?.slot;
  if (!EQUIPMENT_SLOTS.includes(slot)) return { inventory, success: false, reason: 'not-equippable' };
  const previous = next.equipped[slot];
  next.equipped[slot] = next.items[index];
  next.items.splice(index, 1);
  if (previous) next.items.push(previous);
  return { inventory: next, success: true, slot };
}

export function unequipItem(inventory, slot) {
  if (!EQUIPMENT_SLOTS.includes(slot) || !inventory.equipped[slot]) return { inventory, success: false, reason: 'empty-slot' };
  const result = addItem(inventory, inventory.equipped[slot].itemId, inventory.equipped[slot].quantity);
  if (!result.added) return { inventory, success: false, reason: 'inventory-full' };
  const next = result.inventory;
  next.equipped[slot] = null;
  return { inventory: next, success: true };
}

export function inventoryValue(inventory) {
  return inventory.items.reduce((sum, stack) => sum + (findItemDefinition(stack.itemId)?.value ?? 0) * stack.quantity, 0);
}
