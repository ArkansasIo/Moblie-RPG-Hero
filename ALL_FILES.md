# Moblie RPG Hero — File Inventory

**Version:** 0.3.0

This document records the repository structure and the role of the major source, build, documentation, RPG data, runtime-system, fantasy asset, and Android files.

## Core application

- `main.js` — Electron main process.
- `preload.js` — secure renderer bridge.
- `preload-inventory.js` — inventory-window bridge.
- `src/game.js` — main game renderer and simulation loop.
- `src/index.html` / `src/style.css` — mobile game shell and presentation UI.
- `src/inventory.html` / `src/inventory.js` / `src/inventory.css` — inventory UI.

## Fantasy asset integration

```text
src/assets/fantasy/
├── dnd5e-class-emblems.svg
├── dnd5e-equipment.svg
├── dnd5e-monsters.svg
└── dnd5e-biomes.svg

src/rpg/
└── FantasyAssetCatalog.js
```

The fantasy sheets are now exposed through the RPG/MMO command UI. The catalog provides stable IDs for classes, equipment, monsters and biomes; the browser crops the five-frame SVG sheets with CSS background positioning so the individual assets can be selected in-game.

## Android

- `android/app/src/main/AndroidManifest.xml` — Android application manifest.
- `android/app/src/main/java/io/arkansasio/taskbarhero/MainActivity.java` — Android entry activity.
- `android/app/src/main/res/values/strings.xml` — application resources.
- `android/app/src/main/res/values/styles.xml` — Android theme.
- `android/app/build.gradle` — Android build configuration.
- `.github/workflows/android.yml` — Android CI/build workflow.
- `.github/workflows/android-release.yml` — Android release workflow.
- `.github/workflows/release-android.yml` — Android release packaging workflow.

## RPG data layer

```text
src/rpg/
├── characterData.js
├── equipmentData.js
├── inventoryData.js
├── zoneData.js
├── endgameData.js
├── questData.js
├── combatData.js
├── eventData.js
├── professions.js
├── mmorpgSystems.js
├── FantasyAssetCatalog.js
└── index.js
```

- `characterData.js` — level-100 character/class catalog and core attributes.
- `equipmentData.js` — equipment slots, weapon types, armor types, rarity and equip validation.
- `inventoryData.js` — inventory capacity and item-stack operations.
- `zoneData.js` — nine world zones, sub-zones and trails.
- `endgameData.js` — raids and 100-floor Tower of Ascension definitions.
- `questData.js` — quest types, states and starter quests.
- `combatData.js` — damage types, combat roles and derived combat math.
- `eventData.js` — world events and world-boss definitions.
- `professions.js` — 12 gathering/crafting professions with level-100 progression.
- `mmorpgSystems.js` — MMO-facing system definitions.
- `FantasyAssetCatalog.js` — stable in-game fantasy asset IDs and sheet/frame mappings.
- `index.js` — consolidated RPG data exports.

## Configuration

- `src/config/contentCatalog.js` — biomes, dungeons, raids and world bosses.
- `src/config/items.js` — item catalog and rarity presentation data.
- `src/config/heroClasses.js` — legacy/runtime hero class tuning.
- `src/config/lootTables.js` — loot rarity and generated item definitions.
- `src/config/weaponTypes.js` — named weapon definitions.
- `src/config/enemyRoles.js` — enemy role modifiers.
- `src/config/waveConfig.js` — wave sizing and boss intervals.
- `src/config/bossMechanics.js` — boss enrage/heavy attack tuning.
- `src/config/rpgRules.js` — d20-inspired RPG rules and class definitions.

## Runtime systems

```text
src/systems/
├── AbilitySystem.js
├── AchievementSystem.js
├── CharacterSystem.js
├── CombatSystem.js
├── CraftingSystem.js
├── DungeonSystem.js
├── EconomySystem.js
├── EquipmentSystem.js
├── EventSystem.js
├── GuildSystem.js
├── InventorySystem.js
├── LootSystem.js
├── PartySystem.js
├── ProgressionSystem.js
├── ProfessionSystem.js
├── PvPSystem.js
├── QuestSystem.js
├── RaidSystem.js
├── SaveSystem.js
├── SocialSystem.js
├── StatsSystem.js
├── TalentSystem.js
├── TowerSystem.js
├── TrailSystem.js
├── TravelSystem.js
├── WaveSystem.js
├── WorldBossSystem.js
├── WorldSystem.js
└── ZoneSystem.js
```

The runtime layer covers character lifecycle, stats, equipment, inventory, professions, quests, combat, loot, dungeons, raids, tower progression, trails, travel, world events, world bosses, parties, economy, social/MMO systems, zones, and persistence.

## State and entities

- `src/state/GameState.js` — central party, gold, stage, inventory and enemy state.
- `src/state/SaveManager.js` — existing save/offline progression integration.
- `src/entities/Hero.js` — hero runtime model.
- `src/entities/Enemy.js` — enemy/boss runtime model.

## Documentation

- `README.md` — project overview and development guide.
- `ALL_FILES.md` — maintained source inventory.
- `docs/SOURCE_TREE.md` — architectural source tree.
- `docs/RPG_COMPONENTS.md` — RPG component/data architecture.
- `docs/RUNTIME_SYSTEMS.md` — runtime system architecture and data flow.
- `docs/RPG_PROFESSIONS.md` — profession system.
- `docs/RPG_WORLD_CONTENT.md` — world/content specification.
- `docs/RPG_MMO_FEATURES.md` — MMO feature specification.
- `docs/MO_RPG_HERO_GDD.md` — game design document.
- `docs/RPG_EXPANSION_DESIGN.md` — expansion architecture.
- `docs/RPG_TEST_MATRIX.md` — RPG test matrix.
- `docs/ANDROID_BUILD.md` — Android build guidance.

## World content model

```text
World
├── Biomes
│   └── Zones
│       └── Sub-zones
│           ├── Encounters
│           ├── Quests
│           ├── Resources
│           ├── Events
│           ├── Dungeons
│           └── World Bosses
├── Trails
├── Raids
└── Tower
    └── Floors 1–100
```

The implemented data layer includes nine world zones, four named sub-zones per zone, multiple biome definitions, five trails, five catalog dungeons, three catalog raids, world bosses, professions, quests, equipment, inventory, events, and a 100-floor tower system.

## RPG equipment model

Weapons: Sword, Greatsword, Axe, GreatAxe, Mace, Hammer, Spear, Polearm, Dagger, Bow, Crossbow, Staff, Wand, Shield.

Armor: Cloth, Leather, Mail, Plate.

Slots: Head, Chest, Shoulders, Hands, Legs, Feet, MainHand, OffHand, Neck, Ring1, Ring2, Trinket1, Trinket2.

Rarity: Common, Uncommon, Rare, Epic, Legendary, Mythic, Unique, plus the legacy loot table's extended rarity ladder.

## Professions

Gathering: Mining, Logging, Herbalism, Skinning, Fishing, Archaeology.

Crafting: Blacksmithing, Alchemy, Tailoring, Jewelcrafting, Cooking, Engineering.

Maximum profession level: 100.

## Build and validation

Typical development commands:

```bash
npm install
npm start
npm test
node scripts/check-rpg-source.mjs
npm run build
```

Android:

```bash
npm run stage:android
cd android
./gradlew assembleDebug
./gradlew assembleRelease
```

## Maintenance rules

1. Keep data definitions separate from runtime behavior.
2. Keep runtime systems serializable where practical.
3. Add deterministic validation/tests for new systems.
4. Update `README.md` when public features change.
5. Update `ALL_FILES.md` when a major source/config/documentation file is introduced.
6. Keep Android packaging changes documented in `docs/ANDROID_BUILD.md`.
7. Treat client systems as gameplay/domain helpers; multiplayer authority belongs on a server.
8. Keep fantasy asset IDs stable so saves, UI selections and future server payloads can refer to them safely.

Binary assets and transient build output are summarized rather than enumerated byte-for-byte.
