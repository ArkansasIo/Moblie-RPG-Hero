export const STATUS_EFFECTS = Object.freeze({
  burning:{id:'burning',type:'dot',duration:5,stackable:true},
  bleeding:{id:'bleeding',type:'dot',duration:6,stackable:true},
  poison:{id:'poison',type:'dot',duration:8,stackable:true},
  frozen:{id:'frozen',type:'control',duration:2,stackable:false},
  stunned:{id:'stunned',type:'control',duration:2,stackable:false},
  rooted:{id:'rooted',type:'control',duration:3,stackable:false},
  silenced:{id:'silenced',type:'control',duration:3,stackable:false},
  weakened:{id:'weakened',type:'debuff',duration:8,stackable:false},
  vulnerable:{id:'vulnerable',type:'debuff',duration:6,stackable:false},
  haste:{id:'haste',type:'buff',duration:10,stackable:false},
  fortify:{id:'fortify',type:'buff',duration:10,stackable:false},
  regeneration:{id:'regeneration',type:'hot',duration:8,stackable:true},
  berserk:{id:'berserk',type:'buff',duration:12,stackable:false}
});
export function getStatusEffect(id){return STATUS_EFFECTS[id]||null}
export function canStackStatus(id){return Boolean(STATUS_EFFECTS[id]?.stackable)}
