export const DAMAGE_TYPES = Object.freeze(['physical','fire','frost','lightning','nature','arcane','shadow','void','holy']);
export const COMBAT_ROLES = Object.freeze(['tank','melee-dps','ranged-dps','caster-dps','healer','support']);

export const CORE_STATS = Object.freeze({
  maxHP:{base:100, scaling:{VIT:15,CON:10}},
  attackPower:{base:5, scaling:{STR:3,DEX:1}},
  spellPower:{base:5, scaling:{INT:3,WIS:1}},
  armor:{base:0, scaling:{CON:2}},
  critChance:{base:0.05, scaling:{DEX:0.001,LCK:0.002}},
  critDamage:{base:1.5, scaling:{LCK:0.005}},
  haste:{base:0, scaling:{DEX:0.001}},
  lifesteal:{base:0, scaling:{VIT:0.0005}},
  resistance:{base:0, scaling:{WIL:0.001,SPI:0.001}}
});

export function calculateDerivedStats(attributes = {}) {
  const get = key => Number(attributes[key] ?? 0);
  return {
    maxHP: CORE_STATS.maxHP.base + get('VIT') * 15 + get('CON') * 10,
    attackPower: CORE_STATS.attackPower.base + get('STR') * 3 + get('DEX'),
    spellPower: CORE_STATS.spellPower.base + get('INT') * 3 + get('WIS'),
    armor: get('CON') * 2,
    critChance: 0.05 + get('DEX') * 0.001 + get('LCK') * 0.002,
    critDamage: 1.5 + get('LCK') * 0.005,
    haste: get('DEX') * 0.001,
    resistance: get('WIL') * 0.001 + get('SPI') * 0.001
  };
}

export function calculateDamage(power, multiplier = 1, crit = false, critDamage = 1.5) {
  const raw = Math.max(1, power * multiplier);
  return Math.floor(crit ? raw * critDamage : raw);
}
