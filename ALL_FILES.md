# Moblie RPG Hero — File Inventory

**Version:** 0.3.0

This document records the repository structure and the role of the major source, build, documentation, and Android files. It is intended as the maintained companion to `README.md`.

## Root

| Path | Purpose |
|---|---|
| `README.md` | Project overview, RPG systems, build instructions, roadmap |
| `BUILDING.md` | General build/development notes |
| `RELEASE_NOTES_0.3.0.md` | Version 0.3.0 release notes |
| `ROADMAP.md` | Development roadmap |
| `package.json` | Node/Electron project metadata and scripts |
| `.gitignore` | Git exclusions |
| `main.js` | Electron main process |
| `preload.js` | Secure renderer bridge |
| `preload-inventory.js` | Inventory-window renderer bridge |

## Android

```text
android/
├── build.gradle
├── gradle.properties
├── settings.gradle
└── app/
    ├── build.gradle
    ├── proguard-rules.pro
    └── src/main/
        ├── AndroidManifest.xml
        ├── java/io/arkansasio/taskbarhero/MainActivity.java
        └── res/values/
            ├── strings.xml
            └── styles.xml
```

### Android files

- `android/app/build.gradle` — Android application build configuration.
- `android/app/proguard-rules.pro` — release shrinking/obfuscation rules.
- `android/app/src/main/AndroidManifest.xml` — Android application declaration and permissions.
- `android/app/src/main/java/io/arkansasio/taskbarhero/MainActivity.java` — Android activity entry point.
- `android/app/src/main/res/values/strings.xml` — application name and description resources.
- `android/app/src/main/res/values/styles.xml` — Android theme/style resources.

The manifest uses the application description as an Android string resource rather than embedding literal descriptive text in the resource attribute.

## GitHub Actions

```text
.github/workflows/
├── android-release.yml
├── android.yml
├── ci.yml
└── release-android.yml
```

These workflows provide CI/source validation and Android build/release automation.

## Assets

```text
assets/
├── tray-icon-16.png
└── tray-icon-32.png
```

Additional game sprites, effects, and sound assets are stored under the application source asset directories where applicable.

## Configuration

```text
config/
└── release-manifest.v0.3.0.json
```

The release manifest records release-oriented build/package metadata.

## Documentation

Known RPG/mobile documentation includes:

```text
docs/
├── ANDROID_BUILD.md
├── MO_RPG_HERO_GDD.md
├── PATCH_RELEASE_AND_MOBILE_UPDATE.md
├── RPG_EXPANSION_DESIGN.md
├── RPG_MMO_FEATURES.md
├── RPG_TEST_MATRIX.md
└── RPG_PROFESSIONS.md
```

### Documentation roles

- `ANDROID_BUILD.md` — Android build and packaging guidance.
- `MO_RPG_HERO_GDD.md` — game design specification.
- `PATCH_RELEASE_AND_MOBILE_UPDATE.md` — patch/release and mobile update planning.
- `RPG_EXPANSION_DESIGN.md` — RPG expansion architecture and content planning.
- `RPG_MMO_FEATURES.md` — MMORPG feature planning.
- `RPG_TEST_MATRIX.md` — RPG test coverage and validation matrix.
- `RPG_PROFESSIONS.md` — gathering/crafting profession API and integration notes.

## Source

The JavaScript application is organized around renderer code, entities, effects, state, configuration, RPG data, and systems.

```text
src/
├── assets/
├── config/
├── entities/
├── fx/
├── rpg/
├── state/
├── systems/
├── game.js
├── index.html
├── style.css
├── inventory.html
├── inventory.js
└── inventory.css
```

### `src/entities/`

Entity models contain gameplay objects such as heroes and enemies.

- `Hero.js` — hero stats, leveling, equipment, and combat actions.
- `Enemy.js` — stage-scaled enemies, roles, boss state, enrage, and attack tracking.

### `src/systems/`

Gameplay systems operate on game state and should remain as independent and testable as practical.

- `CombatSystem.js` — resolves combat ticks and combat events.
- `WaveSystem.js` — creates enemy formations and boss waves.
- `LootSystem.js` — generates loot using configured loot tables.
- `ProgressionSystem.js` — advances stages and handles progression/offline simulation.
- `ZoneSystem.js` — world-zone state, travel, entry checks, and encounters when present.

### `src/state/`

- `GameState.js` — central party/gold/inventory/stage/enemy state.
- `SaveManager.js` — save/load and offline-progress handling.

### `src/config/`

Configuration modules define balance and content without requiring changes to the core renderer.

- `heroClasses.js` — hero class statistics and recruitment data.
- `lootTables.js` — rarity and item-generation configuration.
- `weaponTypes.js` — named weapon definitions.
- `enemyRoles.js` — tank/brawler/archer/boss role modifiers.
- `waveConfig.js` — wave sizing and boss interval.
- `bossMechanics.js` — boss enrage and heavy-attack tuning.

### `src/fx/`

Presentation-only combat effects include floating damage text, hit flashes, sound, melee travel, impact sparks, projectiles, ranged attack animation, health bars, walking cycles, coin bursts, and background/parallax effects.

### `src/rpg/`

The RPG data layer is intended for world content and data-driven progression.

- `professions.js` — gathering/crafting profession catalog, progression, and validation.
- `worldData.js` — world/biome/zone/dungeon/raid/trail/tower content when present in the current source revision.

## RPG Content Model

The intended content hierarchy is:

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

### World biomes

- Greenwilds
- Sun Plains
- Ashen Desert
- Frostcrown
- Murkfen
- Emberreach
- Storm Coast
- Aethermoor
- Voidscar

### Major zones

- Thornwatch Frontier
- Goldenroad
- Dunesea
- Frostmarch
- Blackfen
- Emberfall
- Tempest Isles
- Aether Crown
- Voidscar

### Dungeons

- Thorn Crypt
- Sunken Temple
- Glass Catacombs
- Frostkeep
- Dragonforge
- Astral Archive
- Paradox Gate

### Trails

- Wolfrun Trail
- Mirage Trail
- Glacier Ascent
- Stormrunner Trail
- Voidwalker Trail

### Raids

- Citadel of Ashes
- Skyfall Sanctum
- End of Stars

### Tower

The Tower is planned as a 100-floor progression system with elite and boss milestones.

## RPG Equipment Model

### Weapons

Sword, Greatsword, Axe, Great Axe, Mace, Hammer, Spear, Polearm, Dagger, Bow, Crossbow, Staff, Wand, Shield.

### Armor

Cloth, Leather, Mail, Plate.

### Slots

Head, Chest, Shoulders, Hands, Legs, Feet, Main Hand, Off Hand, Neck, Ring 1, Ring 2, Trinket 1, Trinket 2.

### Rarity

Common, Uncommon, Rare, Epic, Legendary, Mythic, Unique.

## Professions

Gathering professions:

- Mining
- Logging
- Herbalism
- Skinning
- Fishing
- Archaeology

Crafting professions:

- Blacksmithing
- Alchemy
- Tailoring
- Jewelcrafting
- Cooking
- Engineering

The profession framework supports a maximum profession level of 100 and data-driven progression/validation.

## Build Scripts

```text
scripts/
└── check-rpg-source.mjs
```

The RPG source validation script is intended to catch malformed or incomplete RPG data before packaging.

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

## Maintenance Rules

When adding a significant source file:

1. Put it in the appropriate subsystem directory.
2. Keep gameplay data separate from rendering where possible.
3. Add validation/tests for new deterministic systems.
4. Update `README.md` when the public feature set changes.
5. Update this `ALL_FILES.md` when a new major source/config/documentation file is introduced.
6. Update Android build documentation when packaging requirements change.

## Status

This file is a maintained architectural inventory, not a generated operating-system directory dump. Binary assets and transient build output are intentionally summarized rather than enumerated byte-for-byte.
