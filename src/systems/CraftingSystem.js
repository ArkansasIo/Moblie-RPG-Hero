export const RECIPES = Object.freeze({
  iron_sword: { id:'iron_sword', name:'Iron Sword', ingredients:{ material_iron_ore:12 }, output:{ itemId:'weapon_iron_sword', quantity:1 }, level:1 },
  moon_staff: { id:'moon_staff', name:'Moonfire Staff', ingredients:{ material_iron_ore:20, material_void_shard:2 }, output:{ itemId:'weapon_moon_staff', quantity:1 }, level:5 },
  ruby: { id:'ruby', name:'Flawless Ruby', ingredients:{ material_iron_ore:5 }, output:{ itemId:'gem_ruby', quantity:1 }, level:10 },
});

export function canCraft(recipeId, inventory, playerLevel = 1) {
  const recipe = RECIPES[recipeId];
  if (!recipe || playerLevel < recipe.level) return false;
  return Object.entries(recipe.ingredients).every(([itemId, required]) => inventory.items.filter((item) => item.itemId === itemId).reduce((sum, item) => sum + item.quantity, 0) >= required);
}

export function craft(recipeId, inventory, playerLevel = 1) {
  const recipe = RECIPES[recipeId];
  if (!canCraft(recipeId, inventory, playerLevel)) return { inventory, success:false, reason:'requirements-not-met' };
  let next = structuredClone(inventory);
  for (const [itemId, required] of Object.entries(recipe.ingredients)) {
    let remaining = required;
    for (let i = next.items.length - 1; i >= 0 && remaining > 0; i--) {
      const stack = next.items[i]; if (stack.itemId !== itemId) continue;
      const used = Math.min(stack.quantity, remaining); stack.quantity -= used; remaining -= used;
      if (stack.quantity <= 0) next.items.splice(i, 1);
    }
  }
  return { inventory: next, success:true, output: recipe.output };
}
