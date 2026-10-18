# Taskbar Hero — RPG Expansion Design

This document records the next implementation layer for the existing Electron + PixiJS game. It extends the current taskbar-sized idle RPG while keeping the compact strip glanceable and placing interactive systems in the inventory popup.

## Existing architecture to preserve

- `src/config/heroClasses.js`: class definitions and starter stats.
- `src/config/enemyRoles.js` and `src/config/waveConfig.js`: enemy/wave tuning.
- `src/config/lootTables.js` and `src/config/weaponTypes.js`: generated items.
- `src/entities/Hero.js`: derived runtime stats and equipment.
- `src/systems/CombatSystem.js`: authoritative local auto-combat tick.
- `src/systems/ProgressionSystem.js`: wave clear, XP, gold, offline/live simulation.
- `src/state/GameState.js` and `src/state/SaveManager.js`: persistent local state.
- `src/inventory.html/js/css`: equipment, recruit UI, inventory popup.

## Proposed expansion modules

### 1. Attribute and sub-stat model

Keep current `hp`, `atk`, `armor`, `attackSpeed`, `critChance`, `critDamageMult`, `cooldownReduction`, `moveSpeed`, and `castSpeed` as the live compatibility layer. Introduce extra attributes incrementally, only when a game mechanic actually consumes them.

Suggested attributes:
- Strength (STR): physical attack scaling.
- Dexterity (DEX): crit and evasion.
- Constitution (CON): HP and armor scaling.
- Intelligence (INT): spell/arcane damage.
- Wisdom (WIS): healing and resource efficiency.
- Vitality (VIT): maximum HP.
- Spirit (SPI): regeneration/support power.
- Luck (LCK): bounded loot quality bonus.
- Willpower (WIL): CC resistance/resolve.
- Charisma (CHA): party support or threat, once threat is implemented.

Derived combat values: attack, max HP, armor, attack speed, crit chance, crit multiplier, cooldown reduction, movement speed, cast speed, healing, evasion, elemental bonuses, and damage reduction. All percentage values should be represented as decimals internally (0.15 = 15%) and clamped at a defined cap.

### 2. Combat formula baseline

These are proposed defaults for balancing, not calibrated production values.

- `MaxHP = BaseHP + Level * HPPerLevel + VIT * 15 + CON * 10 + EquipmentHP`
- `Attack = BaseAttack + Level * AttackPerLevel + STR * 2.5 + EquipmentAttack`
- `CritChance = clamp(BaseCrit + DEX * 0.0004 + EquipmentCrit, 0, CritCap)`
- `ExpectedDPS = Attack * EffectiveAttackSpeed * (1 + CritChance * (CritMultiplier - 1))`
- `ArmorMitigation = Armor / (Armor + K * max(1, AttackerLevel))`
- `DamageTaken = max(1, RawDamage * (1 - Mitigation) * (1 - Resistance) * VulnerabilityMultiplier - FlatArmor)`

Keep the existing simple armor subtraction behavior until the new formulas are covered by regression tests; migrate one formula at a time to avoid save compatibility or progression surprises.

### 3. Enemy taxonomy and boss encounters

Ranks:
- Normal, Veteran, Elite, Champion, Boss, Raid Boss, Mythic, Ascended.

Roles:
- Tank, Bruiser, Archer, Assassin, Caster, Controller, Summoner, Support, Trickster.

Boss encounter features:
- Boss stage cadence configurable through `BOSS_INTERVAL`.
- HP-threshold phases with unlocked abilities/mechanics.
- Telegraph before high-damage mechanics.
- Enrage event and heavy-attack rotation (already present).
- Guaranteed minimum reward quality for a boss, while keeping random bonus loot.
- Unique boss reward IDs should be saved in the ordinary inventory array so the current save model continues to work.

### 4. Itemization expansion

Current slots are `weapon`, `armor`, and `trinket`. Suggested next slots are `helmet`, `chest`, `legs`, `gloves`, `boots`, `amulet`, `ring`, and `relic`, added only after the inventory UI supports them.

Item definition fields:
- `id`, `label`, `slot`, `rarity`, `requiredLevel`, `allowedClasses`
- `stats`: numeric stat bonuses, validated against supported Hero getter keys
- `source`: normal, elite, boss, quest, craft
- `context`: PvE or PvP where applicable
- `setId` and `setPieceCount` for future set bonuses

Rarity should affect stat budgets, not bypass caps. Use bounded weights for Luck and avoid unrestricted multiplicative stacking.

### 5. PvE/PvP split

The present game is a local PvE idle game. PvP should be a separate mode rather than silently changing the current PvE balance. For a future PvP mode:
- normalize item power and character levels in the match instance;
- use separate PvP stat modifiers;
- cap critical damage, cooldown reduction, healing and CC duration;
- reduce proc variance and add counterplay windows;
- do not imply competitive/security-grade PvP exists until a server-authoritative multiplayer backend is built.

### 6. Save compatibility

- New save fields must always have defaults when old save files are loaded.
- Do not change the structure of `party`, `inventory`, `gold`, `stage`, or `lastSavedAt` without a migration.
- Item IDs must be unique and stable after saving.
- Clamp loaded item stats and character resource values at load time.

### 7. Validation checklist

1. `npm ci`
2. `npm run check`
3. Validate inventory module syntax.
4. Unit tests for formula caps and edge cases: zero stats, negative modifiers, high levels, crit cap, and armor mitigation.
5. Smoke test old save data with missing optional fields.
6. Test boss drops, normal drops, equipment swapping, wrong-class rejection, party wipe, level-up, and offline catch-up.
7. Run the Windows NSIS build in GitHub Actions and download the resulting artifact for a clean-machine install test.

## Implementation sequence

1. Add tests and a small pure-function combat-stat module.
2. Add boss reward floor plus randomized bonus loot.
3. Add new item slots and inventory rendering.
4. Add set bonuses and bounded enhancement/enchantment system.
5. Add status effects and timed buffs/debuffs.
6. Add zone/biome data and dungeon encounter definitions.
7. Consider online account/server features only after local gameplay systems and persistence are stable.
