import { RPG_MENUS } from './rpgData.js';
import './rpg.css';

const pageText = {
  Overview: 'Character overview, combat rating, current build, resources, equipment and progression.',
  Attributes: 'STR DEX CON INT WIS VIT SPI LCK WIL CHA and derived combat statistics.',
  Skills: 'Active skills, passive skills, cooldowns, resource costs and skill upgrades.',
  Talents: 'Talent trees, specialization nodes, unlock requirements and respec controls.',
  Classes: 'Class, subclass, role, mastery and class progression.',
  Reputation: 'Faction standings, reputation rewards and unlockable vendors.',
  Titles: 'Earned titles, achievement titles and display title selection.',
  Bag: 'Inventory grid, stacking, sorting, filtering, item comparison and quick-use actions.',
  Equipment: 'Head, chest, legs, gloves, boots, main-hand, off-hand, rings, amulet, cloak, belt and trinkets.',
  Loadouts: 'Save, rename and swap PvE/PvP equipment and ability loadouts.',
  Crafting: 'Craft weapons, armor, consumables, gems, runes and enhancement materials.',
  Materials: 'Ore, wood, cloth, leather, monster parts, reagents and rare crafting components.',
  Collections: 'Mounts, pets, cosmetics, relics, recipes and discovered items.',
  'World Map': 'World map with zones, travel routes, dungeon entrances, events and world bosses.',
  Zones: 'Zone levels, recommended power, faction control, resources and activities.',
  Biomes: 'Forest, desert, tundra, swamp, volcanic, oceanic, arcane, void and corrupted biomes.',
  'Points of Interest': 'Towns, shrines, camps, resource nodes, portals and hidden locations.',
  Dungeons: '5-player procedural and authored dungeons with bosses, affixes and loot.',
  Raids: '8–40 player raid encounters, phases, mechanics, loot tables and lockouts.',
  'World Bosses': 'Open-world bosses with player-count scaling, phases and contribution rewards.',
  Events: 'Timed invasions, world events, seasonal events and dynamic encounter chains.',
  Combat: 'Real-time combat pipeline: target, ability, hit, mitigation, effects, threat and rewards.',
  Abilities: 'Ability book, rotations, combos, interrupts, ultimates and resource management.',
  'Buffs & Debuffs': 'Stacking, duration, dispels, immunity windows and crowd-control diminishing returns.',
  Threat: 'Damage, healing, proximity, taunts and threat modifiers for MMO tanking.',
  'Damage Log': 'Damage, healing, mitigation, critical hits, deaths and encounter telemetry.',
  Training: 'DPS/HPS test area, target dummies, build testing and combat metrics.',
  'Quest Log': 'Active, completed, failed, shared and tracked quests.',
  'Main Story': 'Main campaign chapters, story bosses, objectives and unlock progression.',
  'Side Quests': 'Exploration, faction, NPC and regional quest chains.',
  Daily: 'Daily quests, rotating objectives and daily rewards.',
  Weekly: 'Weekly dungeon, raid, PvP and world objectives.',
  Achievements: 'Achievement categories, milestones, rewards and completion tracking.',
  Party: 'Party finder, roles, ready check, loot rules, kick/transfer leadership and group finder.',
  Guild: 'Guild roster, ranks, permissions, guild bank, guild quests and guild progression.',
  Friends: 'Friends list, presence, party invites, blocks and recent players.',
  Mail: 'Player mail, system mail, attachments and notifications.',
  Chat: 'Global, local, party, guild, whisper and system channels.',
  Trading: 'Secure player-to-player trade window with confirmation locks.',
  Social: 'Social profile, emotes, groups, communities and player reputation.',
  Arena: 'Ranked and unranked small-team arena combat with normalized PvP stats.',
  Battlegrounds: 'Objective-based team PvP, queues, scoreboards and rewards.',
  Ranked: 'Competitive rating, divisions, matchmaking and seasonal rewards.',
  Duels: 'Open-world friendly duels with configurable rules.',
  Leaderboards: 'PvE, PvP, dungeon, raid, achievement and wealth rankings.',
  'PvP Season': 'Season schedule, conquest currency, seasonal gear and rating rewards.',
  Leveling: 'Level progression, XP curves, level rewards and level-gated content.',
  Experience: 'XP sources, rested XP, catch-up systems and bonus multipliers.',
  'Gear Score': 'Item power, gear score, effective power and encounter readiness.',
  Masteries: 'Weapon mastery, class mastery, crafting mastery and account mastery.',
  Research: 'Long-term technology and research trees with unlock prerequisites.',
  Endgame: 'Mythic dungeons, raids, world bosses, seasons, ascension and prestige.',
  Currency: 'Gold and specialized currencies with sources, sinks and transaction history.',
  Marketplace: 'Browse, search, filter, buy and sell player economy listings.',
  'Auction House': 'Timed auctions, bids, buyouts, taxes and listing limits.',
  Bank: 'Persistent storage, tabs, search, sorting and shared storage.',
  Vendors: 'NPC shops, reputation vendors, token vendors and rotating inventories.',
  Economy: 'Inflation controls, sinks, faucets, taxes, item value and economy telemetry.',
  Settings: 'Game, gameplay, interface, privacy and account settings.',
  Controls: 'Keyboard, mouse, touch, controller bindings and accessibility shortcuts.',
  Audio: 'Master, music, ambience, effects, voice and UI volume.',
  Video: 'Resolution, scale, frame rate, effects and pixel-art rendering options.',
  Accessibility: 'Text size, contrast, color filters, motion options, input assistance and captions.',
  'Save/Load': 'Manual save, autosave status, local backup and compatible save migration.',
  Help: 'Tutorials, combat rules, formulas, glossary and troubleshooting.'
};

export function createRPGMenu({ root = document.body, getState = () => ({}) } = {}) {
  let activeMenu = 'character';
  let activePage = 'Overview';
  const overlay = document.createElement('section');
  overlay.className = 'rpg-menu-overlay';
  overlay.hidden = true;

  const nav = document.createElement('aside');
  nav.className = 'rpg-menu-nav';
  const content = document.createElement('main');
  content.className = 'rpg-menu-content';
  overlay.append(nav, content);
  root.appendChild(overlay);

  function render() {
    nav.innerHTML = `<div class="rpg-brand">TASKBAR HERO<br><small>RPG / MMORPG COMMAND</small></div>`;
    Object.entries(RPG_MENUS).forEach(([key, pages]) => {
      const group = document.createElement('div'); group.className = 'rpg-nav-group';
      const button = document.createElement('button'); button.className = key === activeMenu ? 'active' : ''; button.textContent = key.toUpperCase();
      button.onclick = () => { activeMenu = key; activePage = pages[0]; render(); };
      group.appendChild(button);
      if (key === activeMenu) pages.forEach(page => {
        const p = document.createElement('button'); p.className = page === activePage ? 'sub active' : 'sub'; p.textContent = page;
        p.onclick = () => { activePage = page; render(); };
        group.appendChild(p);
      });
      nav.appendChild(group);
    });

    const state = getState() ?? {};
    content.innerHTML = `<header class="rpg-page-head"><div><span>${activeMenu.toUpperCase()}</span><h1>${activePage}</h1></div><button class="rpg-close">×</button></header><section class="rpg-page"><div class="rpg-card hero-card"><h2>${activePage}</h2><p>${pageText[activePage] ?? 'RPG/MMORPG system page.'}</p><div class="rpg-stat-grid"><div><b>Level</b><span>${state.level ?? 1}</span></div><div><b>Gold</b><span>${state.gold ?? 0}</span></div><div><b>Power</b><span>${state.power ?? 0}</span></div><div><b>Party</b><span>${state.partySize ?? 1}</span></div></div></div><div class="rpg-card"><h3>System Actions</h3><div class="rpg-actions"><button>Open Details</button><button>Compare</button><button>Sort / Filter</button><button>Track</button></div></div><div class="rpg-card"><h3>Data / Rules</h3><pre>${JSON.stringify({menu: activeMenu, page: activePage, state}, null, 2)}</pre></div></section>`;
    content.querySelector('.rpg-close').onclick = close;
  }
  function open() { overlay.hidden = false; render(); }
  function close() { overlay.hidden = true; }
  function toggle() { overlay.hidden ? open() : close(); }
  render();
  return { open, close, toggle, render, element: overlay };
}
