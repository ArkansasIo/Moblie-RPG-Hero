import { createRPGMenu } from './RPGMenu.js';

const menu = createRPGMenu({
  getState: () => {
    const party = window.taskbarHero?.getLastInventorySnapshot?.() ?? null;
    return {
      level: party?.party?.[0]?.level ?? 1,
      gold: party?.gold ?? 0,
      power: party?.party?.reduce((sum, h) => sum + (h.level ?? 1), 0) ?? 0,
      partySize: party?.party?.length ?? 1
    };
  }
});

const button = document.createElement('button');
button.className = 'rpg-command-button';
button.textContent = 'RPG / MMO';
button.title = 'Open RPG/MMORPG Command Center';
button.onclick = () => menu.toggle();
document.body.appendChild(button);
window.taskbarHeroRPG = { menu };
