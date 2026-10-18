export const PROFESSIONS = Object.freeze(['mining','logging','herbalism','fishing','skinning','archaeology','blacksmithing','armorsmithing','leatherworking','tailoring','alchemy','enchanting','cooking','jewelcrafting']);

export const RECIPES = Object.freeze([
  {id:'iron-sword',profession:'blacksmithing',level:1,output:'iron-sword',materials:{iron:8,wood:2}},
  {id:'steel-plate',profession:'armorsmithing',level:25,output:'steel-plate',materials:{steel:12,leather:4}},
  {id:'mana-potion',profession:'alchemy',level:10,output:'mana-potion',materials:{herb:4,crystal:1}},
  {id:'arcane-ink',profession:'enchanting',level:40,output:'arcane-ink',materials:{crystal:5,essence:2}},
  {id:'void-relic',profession:'jewelcrafting',level:600,output:'void-relic',materials:{voidCrystal:8,starMetal:2}}
]);

export function getRecipes(profession,level=1) { return RECIPES.filter(r=>r.profession===profession&&level>=r.level); }
export function canCraft(recipe,materials) { return Object.entries(recipe.materials).every(([id,count])=>(materials[id]??0)>=count); }
export function consumeMaterials(recipe,materials) { if(!canCraft(recipe,materials)) return null; const next={...materials}; for(const [id,count] of Object.entries(recipe.materials)) next[id]-=count; return next; }
