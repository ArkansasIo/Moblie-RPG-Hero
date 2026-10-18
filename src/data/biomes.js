export const BIOMES = Object.freeze([
  {id:'verdant_forest',name:'Verdant Forest',climate:'temperate',level:[1,15],terrain:['forest','river'],resources:['oak_log','moonleaf'],enemies:['slime','wolf','goblin']},
  {id:'sunscar_desert',name:'Sunscar Desert',climate:'arid',level:[10,30],terrain:['sand','canyon'],resources:['copper_ore','sunblossom'],enemies:['scorpion','sand_wyrm','raider']},
  {id:'frostfall',name:'Frostfall Tundra',climate:'frozen',level:[25,45],terrain:['snow','ice'],resources:['mithril_ore','moonleaf'],enemies:['ice_wolf','frost_golem','wraith']},
  {id:'emberlands',name:'Emberlands',climate:'volcanic',level:[40,60],terrain:['lava','ash'],resources:['starsteel_ore','dragon_hide'],enemies:['fire_elemental','magma_beast','drake']},
  {id:'verdigris_marsh',name:'Verdigris Marsh',climate:'wetland',level:[50,70],terrain:['swamp','ruin'],resources:['voidroot','dragon_hide'],enemies:['bog_horror','venom_toad','lichling']},
  {id:'skyreach',name:'Skyreach Isles',climate:'aerial',level:[60,75],terrain:['cloud','island'],resources:['arcane_crystal','astral_shard'],enemies:['harpy','storm_drake','sky_guardian']},
  {id:'astral_wastes',name:'Astral Wastes',climate:'cosmic',level:[70,85],terrain:['crystal','rift'],resources:['astral_shard','ancient_relic'],enemies:['voidling','astral_knight','rift_beast']},
  {id:'eclipsed_realm',name:'Eclipsed Realm',climate:'shadow',level:[80,95],terrain:['shadow','citadel'],resources:['voidroot','ancient_relic'],enemies:['shadow_warrior','dread_knight','eclipse_mage']},
  {id:'eternity_nexus',name:'Eternity Nexus',climate:'paradox',level:[90,100],terrain:['nexus','floating'],resources:['astral_shard','ancient_relic'],enemies:['paradox_guardian','time_reaver','nexus_overlord']}
]);
export function getBiome(id){return BIOMES.find(b=>b.id===id)||null}
export function biomeForLevel(level){return BIOMES.filter(b=>level>=b.level[0]&&level<=b.level[1])}
