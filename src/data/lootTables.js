export const LOOT_TABLES = Object.freeze({
  verdant:{rolls:2,entries:[['copper_ore',35],['oak_log',25],['moonleaf',20],['iron_sword',12],['healing_potion',8]]},
  desert:{rolls:3,entries:[['iron_ore',30],['sunblossom',20],['copper_ore',15],['desert_spear',15],['rare_gem',10],['healing_potion',10]]},
  frost:{rolls:3,entries:[['mithril_ore',25],['moonleaf',20],['frost_staff',15],['dragon_hide',12],['rare_gem',15],['mana_potion',13]]},
  ember:{rolls:4,entries:[['starsteel_ore',22],['dragon_hide',18],['flame_blade',16],['arcane_crystal',14],['epic_gem',10],['mana_potion',20]]},
  astral:{rolls:4,entries:[['astral_shard',24],['arcane_crystal',20],['voidroot',15],['astral_bow',12],['ancient_relic',9],['epic_gem',20]]},
  raid:{rolls:6,entries:[['ancient_relic',25],['astral_shard',20],['legendary_weapon',12],['legendary_armor',12],['raid_token',15],['epic_gem',16]]},
  tower:{rolls:2,entries:[['tower_token',30],['rare_gem',20],['epic_gem',20],['tower_equipment',20],['legendary_weapon',10]]}
});
export function getLootTable(id){return LOOT_TABLES[id]||LOOT_TABLES.verdant}
export function rollLoot(id,random=Math.random){const table=getLootTable(id);const total=table.entries.reduce((n,e)=>n+e[1],0);return Array.from({length:table.rolls},()=>{let r=random()*total;for(const [item,weight] of table.entries){r-=weight;if(r<=0)return item}return table.entries.at(-1)[0]})}
