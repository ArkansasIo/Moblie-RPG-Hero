export const PROFESSIONS=Object.freeze(['Mining','Logging','Herbalism','Fishing','Skinning','Archaeology','Blacksmithing','Armorsmithing','Weaponsmithing','Leatherworking','Tailoring','Alchemy','Enchanting','Cooking']);
export const CRAFTING_TIERS=Object.freeze(['Novice','Apprentice','Journeyman','Expert','Master','Grandmaster','Legendary']);
export function professionXPRequired(level){return Math.floor(100*Math.pow(Math.max(1,level),1.8));}
export function addProfessionXP(state,amount){let level=state.level||1,xp=Math.max(0,(state.xp||0)+Math.max(0,amount));while(level<100&&xp>=professionXPRequired(level)){xp-=professionXPRequired(level);level++;}return {...state,level,xp,tier:CRAFTING_TIERS[Math.min(CRAFTING_TIERS.length-1,Math.floor((level-1)/15))]};}
export function createProfessionState(name){return {name,level:1,xp:0,tier:'Novice',recipes:[],specializations:[]};}
export function canCraft(recipe,inventory){return (recipe.materials??[]).every(m=>(inventory[m.id]??0)>=m.amount);}
export function consumeCraftingMaterials(recipe,inventory){const next={...inventory};for(const m of recipe.materials??[])next[m.id]=Math.max(0,(next[m.id]??0)-m.amount);return next;}
export function craft(recipe,inventory,profession){if(!canCraft(recipe,inventory))return {success:false,inventory};return {success:true,inventory:consumeCraftingMaterials(recipe,inventory),item:{...recipe.output,crafted:true,craftedBy:profession.name}};}
