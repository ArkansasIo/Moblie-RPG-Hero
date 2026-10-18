export const WORLD_MAP = Object.freeze({
  id:'aethernox_world',
  spawn:'verdant_frontier',
  zones:[
    {id:'verdant_frontier',biome:'verdant_forest',level:[1,15],subZones:['whispering_woods','greenriver_meadow','old_ruins'],dungeons:['rootbound_caverns']},
    {id:'sunscar_expanse',biome:'sunscar_desert',level:[10,30],subZones:['glass_dunes','sunken_temple','scorpion_canyon'],dungeons:['temple_of_sands']},
    {id:'frostfall_reach',biome:'frostfall',level:[25,45],subZones:['frozen_lake','whitepine','glacier_gate'],dungeons:['frostvault']},
    {id:'emberlands',biome:'emberlands',level:[40,60],subZones:['ashfields','magma_rift','obsidian_peak'],dungeons:['molten_core']},
    {id:'verdigris_marsh',biome:'verdigris_marsh',level:[50,70],subZones:['mirewood','drowned_city','toxic_delta'],dungeons:['sunken_necropolis']},
    {id:'skyreach',biome:'skyreach',level:[60,75],subZones:['cloudharbor','stormspire','celestial_gardens'],dungeons:['storm_temple']},
    {id:'astral_wastes',biome:'astral_wastes',level:[70,85],subZones:['crystal_plain','rift_edge','fallen_observatory'],dungeons:['astral_vault']},
    {id:'eclipsed_realm',biome:'eclipsed_realm',level:[80,95],subZones:['shadowmarch','black_citadel','eclipse_gate'],dungeons:['eclipse_keep']},
    {id:'eternity_nexus',biome:'eternity_nexus',level:[90,100],subZones:['nexus_city','paradox_fields','eternal_spire'],dungeons:['nexus_heart']}
  ]
});
export function getZone(id){return WORLD_MAP.zones.find(z=>z.id===id)||null}
export function zonesForLevel(level){return WORLD_MAP.zones.filter(z=>level>=z.level[0]&&level<=z.level[1])}
