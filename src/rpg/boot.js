import { createRPGMenu } from './RPGMenu.js';
import { FANTASY_ASSET_CATALOG } from './FantasyAssetCatalog.js';

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

function addFantasyAssetPanel() {
  const panel = document.createElement('aside');
  panel.className = 'fantasy-asset-panel';
  panel.setAttribute('aria-label', 'Fantasy RPG asset browser');
  panel.innerHTML = `
    <div class="fantasy-asset-panel__header">
      <strong>Fantasy Assets</strong>
      <button type="button" aria-label="Close fantasy assets">×</button>
    </div>
    <div class="fantasy-asset-panel__grid"></div>
  `;

  const grid = panel.querySelector('.fantasy-asset-panel__grid');
  const close = panel.querySelector('.fantasy-asset-panel__header button');
  const command = document.createElement('button');
  command.className = 'rpg-command-button fantasy-assets-button';
  command.textContent = 'ASSETS';
  command.title = 'Open fantasy class, equipment, monster and biome assets';
  document.body.appendChild(command);

  for (const asset of FANTASY_ASSET_CATALOG) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'fantasy-asset-card';
    card.title = asset.description;
    card.innerHTML = `
      <span class="fantasy-asset-card__sprite" aria-hidden="true"></span>
      <span class="fantasy-asset-card__name">${asset.name}</span>
      <small>${asset.category}</small>
    `;
    const sprite = card.querySelector('.fantasy-asset-card__sprite');
    sprite.style.backgroundImage = `url("${asset.sheet}")`;
    sprite.style.backgroundSize = '500% 100%';
    sprite.style.backgroundPosition = `${asset.frame * 25}% 50%`;
    card.addEventListener('click', () => {
      window.taskbarHeroFantasy = {
        selected: asset,
        select: (id) => FANTASY_ASSET_CATALOG.find((entry) => entry.id === id) ?? null
      };
      for (const other of grid.querySelectorAll('.fantasy-asset-card')) other.classList.remove('is-selected');
      card.classList.add('is-selected');
    });
    grid.appendChild(card);
  }

  close.addEventListener('click', () => { panel.hidden = true; });
  command.addEventListener('click', () => { panel.hidden = !panel.hidden; });
  panel.hidden = true;
  document.body.appendChild(panel);
}

addFantasyAssetPanel();
window.taskbarHeroRPG = { menu };
