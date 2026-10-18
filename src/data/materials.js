export const MATERIALS = Object.freeze([
  {id:'copper_ore',name:'Copper Ore',category:'ore',tier:1,value:4},
  {id:'iron_ore',name:'Iron Ore',category:'ore',tier:2,value:8},
  {id:'mithril_ore',name:'Mithril Ore',category:'ore',tier:4,value:40},
  {id:'starsteel_ore',name:'Starsteel Ore',category:'ore',tier:6,value:120},
  {id:'moonleaf',name:'Moonleaf',category:'herb',tier:2,value:10},
  {id:'sunblossom',name:'Sunblossom',category:'herb',tier:3,value:18},
  {id:'voidroot',name:'Voidroot',category:'herb',tier:6,value:100},
  {id:'oak_log',name:'Oak Log',category:'wood',tier:1,value:4},
  {id:'ebony_log',name:'Ebony Log',category:'wood',tier:4,value:35},
  {id:'dragon_hide',name:'Dragon Hide',category:'hide',tier:5,value:90},
  {id:'primal_scale',name:'Primal Scale',category:'hide',tier:7,value:180},
  {id:'arcane_crystal',name:'Arcane Crystal',category:'gem',tier:4,value:75},
  {id:'astral_shard',name:'Astral Shard',category:'gem',tier:6,value:200},
  {id:'ancient_relic',name:'Ancient Relic',category:'relic',tier:7,value:500}
]);

export function getMaterial(id){return MATERIALS.find(m=>m.id===id)||null}
export function materialValue(id,quantity=1){const m=getMaterial(id);return m?m.value*Math.max(0,quantity):0}
