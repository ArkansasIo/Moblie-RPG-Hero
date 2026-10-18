# Taskbar Hero — RPG/MMORPG Feature Matrix

This document defines the expanded RPG/MMORPG layer now mounted in the client. It is intentionally data-driven so the same concepts can later move into an authoritative server.

## Character

- Character overview
- 10 core attributes: STR, DEX, CON, INT, WIS, VIT, SPI, LCK, WIL, CHA
- Derived physical, magical and survival stats
- Resources: HP, MP, stamina and class resources
- Skills, passive skills, talents, classes and subclasses
- Masteries, reputation and titles
- Level/XP progression and gear score

## Combat

- Hit chance, critical chance, mitigation and damage formulas
- Physical, Fire, Ice, Lightning, Earth, Wind, Water, Light, Dark, Arcane, Poison, Bleed, Void, Chaos and True damage
- Buffs, debuffs, crowd control, damage-over-time and cleanses
- Threat/aggro and taunt logic
- Cooldowns and ability scoring
- PvE and PvP modifiers and caps
- Combat telemetry hooks

## Enemies and AI

Enemy ranks: Normal, Veteran, Elite, Champion, Boss, Raid Boss, Mythic and Ascended.

AI archetypes: Bruiser, Tank, Assassin, Sniper, Caster, Controller, Summoner, Support and Trickster.

AI state machine: Idle → Patrol → Alert → Engage → Combat → Retreat → Reset.

Boss AI supports HP/time/event phase changes, ability utility scoring, cooldown selection, target prioritization and player-count scaling.

## PvE

- Open-world mobs and patrols
- Named/rare enemies
- Elite affixes
- Dungeons
- Procedural encounters
- Raids
- World bosses
- Event bosses
- Mythic/Ascended difficulty
- Loot tables and reward multipliers
- Crafting materials, gear, relics, mounts, pets, cosmetics and titles

## PvP

- Arena
- Battlegrounds
- Ranked matches
- Duels
- PvP seasons
- Leaderboards
- PvP normalization
- Resilience, tenacity and anti-burst rules
- Healing reduction
- CC diminishing returns
- PvP-specific weapon and armor behavior

## Equipment and Itemization

Slots: Head, Chest, Legs, Gloves, Boots, Main Hand, Off Hand, Ring 1, Ring 2, Amulet, Cloak, Belt, Trinket 1 and Trinket 2.

Weapon families include greatsword, longsword, axe, mace, spear, dagger, claw, scythe, bow, crossbow, gun, throwing weapon, staff, wand, tome, catalyst and relic.

Armor categories: Light, Medium and Heavy.

Rarities: Common, Uncommon, Rare, Epic, Legendary, Mythic and Ascended.

PvE equipment emphasizes progression, proc effects, boss bonuses and build synergy. PvP equipment emphasizes normalized power, resilience, counterplay, CC limits and burst control.

## World

- World map
- Zones and biomes
- Points of interest
- Travel routes
- Dungeons and raids
- World boss spawning
- Dynamic events
- Factions and reputation
- Resource nodes

## Social/MMO

- Party finder and group roles
- Guilds, ranks, permissions and guild bank
- Friends and recent players
- Mail
- Chat channels
- Player trading
- Marketplace and auction house
- Player profiles and social systems

## Economy

- Currency and specialized currencies
- Vendors
- Bank/storage
- Player marketplace
- Auction house
- Economy telemetry
- Faucets, sinks and transaction controls

## Menu/Page Architecture

Top-level command categories and their pages are defined in `src/rpg/rpgData.js` and rendered by `src/rpg/RPGMenu.js`.

Character: Overview, Attributes, Skills, Talents, Classes, Reputation, Titles.

Inventory: Bag, Equipment, Loadouts, Crafting, Materials, Collections.

World: World Map, Zones, Biomes, Points of Interest, Dungeons, Raids, World Bosses, Events.

Combat: Combat, Abilities, Buffs & Debuffs, Threat, Damage Log, Training.

Quests: Quest Log, Main Story, Side Quests, Daily, Weekly, Achievements.

Multiplayer: Party, Guild, Friends, Mail, Chat, Trading, Social.

PvP: Arena, Battlegrounds, Ranked, Duels, Leaderboards, PvP Season.

Progression: Leveling, Experience, Gear Score, Masteries, Research, Endgame.

Economy: Currency, Marketplace, Auction House, Bank, Vendors, Economy.

System: Settings, Controls, Audio, Video, Accessibility, Save/Load, Help.

## Authoritative data boundary

The current client systems are designed as reusable game logic. For a true MMO deployment, authoritative combat, inventory, trading, guild, matchmaking, economy and persistence must execute on a trusted server. The client should receive validated state and submit intents rather than own final currency or item results.
