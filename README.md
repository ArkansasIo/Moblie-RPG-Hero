# Moblie RPG Hero

**Version:** 0.3.0  
**Platforms:** Android, Web, Desktop development  
**Repository:** `ArkansasIo/Moblie-RPG-Hero`

Moblie RPG Hero is a data-driven RPG prototype built around a taskbar/idle-RPG presentation with extensible combat, heroes, enemies, waves, equipment, loot, progression, and mobile packaging.

> The project is an active prototype. Some systems are implemented while the larger MMORPG-style world, dungeon, raid, profession, and mobile features are being expanded incrementally.

## Features

- Taskbar/idle RPG combat loop
- Hero party and class system
- Auto-battle and multi-enemy waves
- Boss encounters, enrage, and heavy attacks
- Equipment and inventory UI
- Weapons, armor, trinkets, loot and rarity tiers
- Leveling and progression
- Offline progression/save system
- Pixel-art presentation and combat effects
- Sound effects and combat feedback
- Android project and Gradle build pipeline
- GitHub Actions automation
- Data-driven RPG content architecture
- Gathering and crafting profession framework

## RPG World Structure

The planned world is organized as:

**World → Biome → Zone → Sub-zone → Encounter → Dungeon/Raid/Event**

### Biomes

- Greenwilds
- Sun Plains
- Ashen Desert
- Frostcrown
- Murkfen
- Emberreach
- Storm Coast
- Aethermoor
- Voidscar

### Major Zones

| Zone | Level Range |
|---|---:|
| Thornwatch Frontier | 1–10 |
| Goldenroad | 8–18 |
| Dunesea | 18–30 |
| Frostmarch | 28–42 |
| Blackfen | 38–52 |
| Emberfall | 48–62 |
| Tempest Isles | 58–72 |
| Aether Crown | 68–82 |
| Voidscar | 80–100 |

Each major zone can contain multiple sub-zones, resource nodes, quests, enemies, events, elite encounters, world bosses, trails, and dungeon entrances.

## Dungeons

- Thorn Crypt — 8–12
- Sunken Temple — 18–24
- Glass Catacombs — 30–38
- Frostkeep — 42–50
- Dragonforge — 55–65
- Astral Archive — 72–82
- Paradox Gate — 88–100

## Trails

- Wolfrun Trail
- Mirage Trail
- Glacier Ascent
- Stormrunner Trail
- Voidwalker Trail

## Raids

| Raid | Level | Players |
|---|---:|---:|
| Citadel of Ashes | 55–65 | 8–12 |
| Skyfall Sanctum | 70–82 | 10–16 |
| End of Stars | 90–100 | 12–20 |

Raid content is designed around wings, bosses, mechanics, weekly rewards, and high-tier equipment.

## Tower — Floors 1–100

- Every 5th floor: elite encounter unless it is a boss floor
- Every 10th floor: boss encounter
- Difficulty increases by floor
- Themes progress through Forest, Stone, Desert, Frost, Swamp, Volcanic, Storm, Arcane, Void, and Paradox
- Rewards scale with floor and difficulty

## Classes

Warrior, Knight, Berserker, Rogue, Assassin, Ranger, Mage, Elementalist, Cleric, Paladin, Necromancer, Summoner, and Battlemage.

## Equipment

### Weapons

Sword, Greatsword, Axe, Great Axe, Mace, Hammer, Spear, Polearm, Dagger, Bow, Crossbow, Staff, Wand, Shield.

### Armor

Cloth, Leather, Mail, Plate.

### Equipment Slots

Head, Chest, Shoulders, Hands, Legs, Feet, Main Hand, Off Hand, Neck, Ring 1, Ring 2, Trinket 1, Trinket 2.

### Loot Rarity

Common → Uncommon → Rare → Epic → Legendary → Mythic → Unique.

## Professions

### Gathering

Mining, Logging, Herbalism, Skinning, Fishing, Archaeology.

### Crafting

Blacksmithing, Alchemy, Tailoring, Jewelcrafting, Cooking, Engineering.

Profession progression is data-driven and supports level validation and crafting requirements.

See `docs/RPG_PROFESSIONS.md` for profession API and integration notes.

## Architecture

```text
Moblie-RPG-Hero/
├── android/              Android/Gradle project
├── assets/               Desktop and game assets
├── docs/                 Developer and RPG documentation
├── public/               Web/public assets
├── scripts/              Build and validation scripts
├── src/
│   ├── assets/           Game sprites and SFX
│   ├── config/           Data/configuration modules
│   ├── entities/         Heroes and enemies
│   ├── fx/               Combat and presentation effects
│   ├── rpg/              RPG/world/profession data
│   ├── state/            Game state and save management
│   └── systems/          Combat, waves, loot, progression, zones
├── main.js               Electron main process
├── preload.js            Secure renderer bridge
├── preload-inventory.js  Inventory renderer bridge
├── package.json
└── README.md
```

The core design keeps gameplay systems as deterministic/data-driven logic operating on game state, while rendering remains separate from gameplay rules.

## Development

```bash
npm install
npm start
npm test
node scripts/check-rpg-source.mjs
npm run build
```

## Android Build

Stage Android assets/source:

```bash
npm run stage:android
```

Debug APK:

```bash
cd android
./gradlew assembleDebug
```

Release APK:

```bash
./gradlew assembleRelease
```

Windows:

```bat
gradlew.bat assembleDebug
gradlew.bat assembleRelease
```

## GitHub Actions

The repository automates source validation, RPG data checks, Android dependency setup, Android asset staging, APK builds, and release artifacts.

## Roadmap

### Phase 1 — Core

- Stabilize combat
- Expand hero classes and enemy roles
- Improve save/load
- Expand equipment and loot

### Phase 2 — RPG World

- Complete biome and zone data
- Add sub-zones and encounters
- Add quests and world events
- Expand gathering and crafting

### Phase 3 — Endgame

- Complete dungeons
- Add raids
- Complete the 100-floor Tower
- Add world bosses
- Expand endgame loot

### Phase 4 — Mobile

- Complete Android UI
- Optimize touch controls
- Validate APK builds
- Produce signed release builds

### Phase 5 — MMO Expansion

- Accounts and profiles
- Server-authoritative combat
- Persistent characters
- Multiplayer parties and guilds
- Trading/economy
- Live events

## Project Status

This is an actively developed RPG prototype. The architecture is modular so additional classes, items, enemies, zones, dungeons, raids, tower floors, professions, quests, and events can be added without rewriting the core combat loop.

## License

Use the license defined by the repository before distributing builds or derivative assets. Third-party libraries and assets remain subject to their respective licenses.
