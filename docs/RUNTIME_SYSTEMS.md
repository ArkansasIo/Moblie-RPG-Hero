# RPG Runtime Systems

The runtime layer connects the data-driven RPG catalogs to gameplay state. It is designed for the existing browser/Electron client and can later be mirrored by an authoritative server.

## Systems

- `CharacterSystem.js` — character creation, XP, leveling, validation and respec.
- `StatsSystem.js` — normalized attributes, derived combat values and gear power.
- `EquipmentSystem.js` — equip, unequip and equipment power calculation.
- `InventorySystem.js` — item stacks, capacity and item movement.
- `ProfessionSystem.js` — gathering/crafting profession XP and level progression.
- `QuestSystem.js` — quest state and objective progression.
- `DungeonSystem.js` — dungeon entry and encounter progression.
- `RaidSystem.js` — raid party/lockout and boss progression.
- `TowerSystem.js` — 100-floor tower progression and rewards.
- `TrailSystem.js` — multi-encounter trail runs.
- `TravelSystem.js` — zone travel and trail requirements.
- `WorldSystem.js` — biome/zone discovery and zone entry.
- `EventSystem.js` — timed world events and progress.
- `WorldBossSystem.js` — world-boss encounters.
- `SaveSystem.js` — local storage save/load plus JSON import/export.
- `PartySystem.js` — party membership, size validation and power.
- `CraftingSystem.js` — crafting station and recipe execution.
- `AbilitySystem.js` — cooldowns and ability costs.
- `CombatSystem.js` — live auto-combat resolution.
- `ProgressionSystem.js` — stage, XP, gold and offline progression.
- `AchievementSystem.js` — achievement tracking.
- `TalentSystem.js` — talent allocation.
- `EconomySystem.js` — currencies and economy operations.
- `GuildSystem.js` — guild state and membership.
- `SocialSystem.js` — social/player state.
- `PvPSystem.js` — player-versus-player rules.
- `WaveSystem.js` — enemy wave generation.

## Data flow

`RPG catalogs -> runtime systems -> GameState -> UI/platform bridge`

Persistent client state should remain serializable. Server-authoritative multiplayer features should treat these systems as deterministic domain helpers rather than security boundaries.

## Content scale

The current data layer supports level 1–100 characters, nine world zones with sub-zones, multiple biomes, dungeons, trails, raids, world bosses, professions, quests, equipment, inventory, events and a 100-floor tower.
