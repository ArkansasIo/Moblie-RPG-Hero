# Mo RPG Hero Source Tree

## Runtime
- `src/game.js` — PixiJS battle runtime and presentation loop.
- `src/index.html` / `src/style.css` — mobile game shell.
- `src/platform/` — browser/WebView bridge.
- `src/fx/` — combat, animation, particles and presentation effects.

## RPG data
- `src/config/heroClasses.js` — hero classes and party definitions.
- `src/config/items.js` — weapons, armor, consumables, materials and gems.
- `src/config/contentCatalog.js` — biomes, sub-biomes, dungeons, raids and world bosses.
- `src/config/assetRegistry.js` — runtime pixel-art asset paths.
- `src/config/rpgRules.js` — RPG balance rules.
- `src/config/lootTables.js` — loot definitions.
- `src/config/weaponTypes.js` — weapon definitions.

## Systems
- `src/systems/CombatSystem.js` — combat resolution.
- `src/systems/StatsSystem.js` — core and derived stats.
- `src/systems/InventorySystem.js` — stacks, equipment and inventory.
- `src/systems/AbilitySystem.js` — abilities, cooldowns and resource costs.
- `src/systems/ProgressionSystem.js` — level and XP progression.
- `src/systems/QuestSystem.js` — objectives and rewards.
- `src/systems/CraftingSystem.js` — recipes and crafting.
- `src/systems/EconomySystem.js` — currencies and marketplace primitives.
- `src/systems/ZoneSystem.js` — travel and world encounters.
- `src/systems/TowerSystem.js` — floors 1–100.
- `src/systems/SocialSystem.js` — party, friends and chat state.
- `src/systems/LootSystem.js` — loot generation integration.
- `src/systems/WaveSystem.js` — battle waves.

## RPG/MMO shell
- `src/rpg/RPGEngine.js` — RPG orchestration.
- `src/rpg/AIAgent.js` — local game AI/automation logic.
- `src/rpg/RPGMenu.js` — command-center menu.
- `src/rpg/mmorpgSystems.js` — MMO service/system contracts.
- `src/rpg/worldData.js` — world content.

## Persistence/networking
- `src/state/SaveSchema.js` — versioned save model and migrations.
- `src/network/apiContract.js` — server-ready API envelope and routes.

## Android
- `android/` — native WebView shell.
- `scripts/stage-android-assets.mjs` — deterministic web-to-APK asset staging.
- `.github/workflows/android-release.yml` — debug/release APK build and tag release workflow.
