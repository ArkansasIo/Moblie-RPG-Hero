export const INVENTORY_DEFAULT_CAPACITY = 100;
export const INVENTORY_MAX_CAPACITY = 500;

export function createInventory(capacity = INVENTORY_DEFAULT_CAPACITY) {
  return { capacity: Math.min(INVENTORY_MAX_CAPACITY, Math.max(1, capacity)), items: [] };
}

export function addItem(inventory, item) {
  if (!inventory || !item) return { ok:false, reason:'invalid-input' };
  const existing = inventory.items.find(entry => entry.itemId === item.itemId && entry.stackable);
  if (existing && existing.quantity < (item.stackMax ?? 1)) {
    existing.quantity = Math.min(item.stackMax ?? 1, existing.quantity + (item.quantity ?? 1));
    return { ok:true, stacked:true };
  }
  if (inventory.items.length >= inventory.capacity) return { ok:false, reason:'inventory-full' };
  inventory.items.push({ ...item, quantity: item.quantity ?? 1 });
  return { ok:true, stacked:false };
}

export function removeItem(inventory, itemId, quantity = 1) {
  const index = inventory?.items.findIndex(entry => entry.itemId === itemId) ?? -1;
  if (index < 0) return false;
  const entry = inventory.items[index];
  if (entry.quantity > quantity) entry.quantity -= quantity;
  else inventory.items.splice(index, 1);
  return true;
}
