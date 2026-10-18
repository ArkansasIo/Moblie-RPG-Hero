# RPG Components

This document defines the data and gameplay components added to the mobile RPG architecture.

## Character
- Core attributes: STR, DEX, CON, INT, WIS, VIT, SPI, LCK, WIL, CHA.
- Level cap: 100.
- Class catalog supports tank, melee DPS, ranged DPS, caster, healer, pet and hybrid roles.

## Combat
- Physical, fire, frost, lightning, nature, arcane, shadow, void and holy damage.
- Derived HP, attack power, spell power, armor, crit, crit damage, haste and resistance.
- Deterministic damage calculation suitable for unit tests.

## Equipment
- 13 equipment slots.
- Weapon and armor type catalogs.
- Level, class and armor restrictions.
- Seven rarity tiers from Common through Unique.

## Inventory
- Stack-aware item storage.
- Default capacity 100.
- Maximum capacity 500.
- Add/remove operations return explicit success or failure reasons.

## World
- Biomes, zones and sub-zones.
- Traversable trails.
- Dungeons, raids and world bosses.
- World events and 100-floor Tower of Ascension.

## Professions
- Gathering: Mining, Logging, Herbalism, Skinning, Fishing, Archaeology.
- Crafting: Blacksmithing, Alchemy, Tailoring, Jewelcrafting, Cooking, Engineering.
- Profession level cap: 100.

## Quests
- Main, side, daily, weekly, event and world quest types.
- Progress state and reward definitions.

## Integration rule

Static definitions belong under `src/rpg/` or `src/config/`. Runtime systems should consume these definitions rather than duplicating IDs, names, balance values or progression rules. This keeps content data-driven and makes Android, desktop and web builds use the same game model.
