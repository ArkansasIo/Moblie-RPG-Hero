# Mo RPG Hero — Game Design Document (GDD)

**Product:** Mo RPG Hero  
**Previous working name:** Taskbar Hero  
**Version:** 0.3.0  
**Version code:** 3  
**Release channel:** release-candidate  
**Developer:** ArkansasIo  
**Target platforms:** Android, Windows, Web  
**Document date:** 2026-10-18

## 1. Product vision

Mo RPG Hero is a pixel-art RPG/MMORPG platform built from the existing Electron + PixiJS auto-battle prototype. The product combines glanceable real-time combat with a deeper RPG command interface for character progression, equipment, quests, world exploration, dungeons, trials, raids, tower progression, social systems, economy and future authoritative multiplayer.

The core design rule is separation of concerns: the combat loop remains lightweight and readable while interactive RPG systems live in responsive menus and pages. Game data is data-driven so classes, creatures, items, zones, encounters and balance can grow without rewriting the core simulation.

## 2. Design pillars

1. **Readable combat:** every hit, heal, ability, boss phase and reward has clear audiovisual feedback.
2. **Data-driven content:** content definitions live in configuration/data modules; systems consume those definitions.
3. **Persistent progression:** XP, levels, equipment, inventory, currencies, quests and account/world state are designed for migration-safe persistence.
4. **Scalable multiplayer:** local/host play is supported first; authoritative multiplayer is a later server boundary.
5. **Mobile-first responsiveness:** UI adapts to screen size, orientation, party size and encounter type.
6. **Original identity:** use original names, art, music, creatures and story content rather than copying proprietary game assets or text.

## 3. Current playable foundation

The current client contains a PixiJS rendering loop, party combat, multi-enemy waves, progression, loot, inventory, save/load, offline catch-up, hero recruitment, boss mechanics, animations, floor/background effects and an RPG menu architecture. The existing feature matrix also defines character, combat, AI, PvE, PvP, itemization, world, social and economy domains.

## 4. Character and party

- Hero classes with class-specific stat blocks.
- Level and XP progression.
- Core attributes: STR, DEX, CON, INT, WIS, VIT, SPI, LCK, WIL, CHA.
- Derived combat statistics and resources.
- Equipment, loadouts, skills, passives, talents, masteries, reputation and titles.
- Party roles: tank, healer/support, melee DPS, ranged DPS and control.
- Configurable party-size rules; the current prototype uses a small party while future multiplayer supports larger encounters.

## 5. Combat

Combat is event-driven and state-based. `CombatSystem` resolves a simulation tick against `GameState`, while rendering reacts to events such as impacts, deaths, level-ups, loot drops, wave spawns and boss phases.

Supported design domains include physical and elemental damage, critical hits, mitigation, cooldowns, buffs/debuffs, crowd control, threat, taunts, healing and PvE/PvP modifiers. Bosses can use phase changes, telegraphs, enrage, heavy attacks, target selection and player-count scaling.

## 6. Enemies and AI

Enemy ranks: Normal, Veteran, Elite, Champion, Boss, Raid Boss, Mythic and Ascended.

AI archetypes: Tank, Bruiser, Assassin, Sniper, Caster, Controller, Summoner, Support and Trickster.

Canonical state flow: Idle → Patrol → Alert → Engage → Combat → Retreat → Reset.

Boss AI adds phase triggers, ability utility scoring, cooldown selection, target prioritization and encounter scaling.

## 7. World and content

World hierarchy:

`World > Biome > Sub-biome > Zone > Sub-zone > Point of Interest > Instance`

The current world-content design includes nine biome families, nine level bands through level 100, named sub-zones, towns, camps, resource nodes, portals, dungeons and dynamic events. Trails provide repeatable traversal/combat content. Dungeons and raids provide instanced group content. Tower of Ascension contains 100 structured floors with milestone and boss floors.

## 8. Story framework

The production story target is 12 acts with 5 chapters per act, for 60 primary chapters. Each chapter can contain a main quest chain, optional side quests, encounter objectives, exploration objectives, NPC interactions, rewards and chapter completion state.

Story data must be stored as content definitions rather than hard-coded into UI logic.

## 9. Items and equipment

Equipment domains include weapons, armor, shields, off-hands, rings, relics, accessories and future specialized slots. Item definitions contain stable IDs, display names, slot, rarity, required level, allowed classes, stat payload, source, PvE/PvP context and optional set metadata.

Rarity is a bounded stat-budget mechanism. Enhancements, enchantments and set bonuses must respect explicit caps.

## 10. Inventory and crafting

Baseline inventory design includes bag and bank storage, stackable materials/consumables/quest items, equipment management and collections. Crafting disciplines include blacksmithing, armoring, leatherworking, alchemy, enchanting and jewelcrafting.

## 11. PvE modes

- Open-world encounters.
- Trails.
- Dungeons.
- Trials.
- Raids.
- World bosses.
- Dynamic events.
- Tower of Ascension, floors 1–100.
- Mythic/Ascended difficulty.

## 12. PvP modes

- Arena.
- Battlegrounds.
- Ranked seasons.
- Duels.
- Leaderboards.
- PvP-normalized stats and resilience/tenacity rules.

Competitive PvP is not considered security-grade until the authoritative server architecture is deployed.

## 13. Audio and music

The audio architecture is organized into independent buses: Master, Music, SFX, Ambient, Voice, UI and Combat.

Required content includes a one-minute seamless title loop, menu music, biome/zone themes, town ambience, dungeon/trial/raid music, boss themes, victory/defeat cues, combat impacts, weapon and ability sounds, UI sounds, crafting/loot sounds, creature sounds, environmental ambience and multiplayer notifications.

The existing `SoundManager` provides the compatibility layer for one-shot SFX; the next audio layer should add music playback, looping, category volume, crossfades and event-driven track selection.

## 14. UI/UX

Top-level command categories:

Character, Inventory, World, Combat, Quests, Multiplayer, PvP, Progression, Economy and System.

Responsive rules are based on screen size, orientation, player count and encounter type. Solo play prioritizes the combat viewport. Larger parties switch to compact party/raid frames and grouped world indicators rather than rendering an unreadable wall of status bars.

## 15. Persistence and database model

The logical data model covers accounts/players, characters, stats, inventory, equipment, currencies, quests, world progression, encounters, guilds, parties, social relationships, mail, marketplace, achievements, research, masteries, housing, pets, mounts and seasonal records.

Development/server deployments can use MySQL. A standalone Android build should use an embedded/mobile persistence implementation with the same logical schema and migration contract rather than attempting to ship a full MySQL server inside a normal APK.

## 16. Networking and patch delivery

GitHub is the source-of-truth repository. Changes flow through CI into Android build artifacts and tagged releases. A production patch system should publish a signed APK for full binary updates and a versioned content manifest for assets/data that can safely be updated without replacing the entire application.

The client must verify package version, manifest version, integrity hashes and compatibility before applying an update. Failed updates must leave the previous known-good content active.

## 17. Security boundaries

Client-side code is trusted only for presentation and input. Currency, inventory ownership, loot results, trading, guild permissions, competitive results and other authoritative MMO state must be validated by a trusted host/server in online mode.

## 18. Release definition

Version 0.3.0 is the current release-candidate baseline. Release documentation must record source commit, version, version code, channel, platform, artifact names, signing state, schema version, migration version, audio/content manifest version and known limitations.

## 19. Quality gates

- JavaScript syntax checks.
- Android debug and release compilation.
- Save migration tests.
- Combat regression tests.
- Loot/equipment validation.
- Audio asset validation.
- Responsive UI smoke tests.
- Clean install and upgrade tests.
- Release artifact checksum generation.
- Signed production package verification before public distribution.
