import { createRPGMenu } from './RPGMenuController.js';
import { FANTASY_ASSET_CATALOG } from './FantasyAssetCatalog.js';

const menu = createRPGMenu({
  state: (() => {
    const party = window.taskbarHero?.getLastInventorySnapshot?.() ?? null;
    return { menu: 'character', page: 'Overview', level: party?.party?.[0]?.level ?? 1, gold: party?.gold ?? 0, power: party?.party?.reduce((sum, h) => sum + (h.level ?? 1), 0) ?? 0, partySize: party?.party?.length ?? 1 };
  })()
});

const button = document.createElement('button');
button.className = 'rpg-command-button';
button.textContent = 'RPG / MMO';
button.title = 'Open RPG/MMORPG Command Center';
button.onclick = () => menu.toggle();
document.body.appendChild(button);

function addMobileUpdateButton() {
  const update = document.createElement('button');
  update.className = 'rpg-command-button mobile-update-button';
  update.type = 'button';
  update.textContent = 'UPDATE';
  update.title = 'Check GitHub for the latest Mo RPG Hero build';
  update.addEventListener('click', () => {
    if (window.AndroidBridge?.updateFromGitHub) {
      update.disabled = true;
      update.textContent = 'CHECKING…';
      window.AndroidBridge.updateFromGitHub();
      window.setTimeout(() => { update.disabled = false; update.textContent = 'UPDATE'; }, 5000);
    } else {
      window.open('https://github.com/ArkansasIo/Moblie-RPG-Hero/releases', '_blank', 'noopener,noreferrer');
    }
  });
  document.body.appendChild(update);

  fetch('./build-info.json', { cache: 'no-store' })
    .then(response => response.ok ? response.json() : null)
    .then(info => {
      if (!info) return;
      update.title = `Build ${info.version} • ${info.buildId} • patch ${info.patch}`;
      update.setAttribute('aria-label', `Update Mo RPG Hero. Current build ${info.version}, ${info.buildId}`);
    })
    .catch(() => {});
}

function addFantasyAssetPanel() {
  const panel = document.createElement('aside');
  panel.className = 'fantasy-asset-panel';
  panel.setAttribute('aria-label', 'Fantasy RPG asset browser');
  panel.innerHTML = `<div class="fantasy-asset-panel__header"><strong>Fantasy Assets</strong><button type="button" aria-label="Close fantasy assets">×</button></div><div class="fantasy-asset-panel__grid"></div>`;
  const grid = panel.querySelector('.fantasy-asset-panel__grid');
  const close = panel.querySelector('.fantasy-asset-panel__header button');
  const command = document.createElement('button');
  command.className = 'rpg-command-button fantasy-assets-button'; command.textContent = 'ASSETS';
  command.title = 'Open fantasy class, equipment, monster and biome assets'; document.body.appendChild(command);
  let rendered = false;
  const renderAssets = () => {
    if (rendered) return; rendered = true;
    const fragment = document.createDocumentFragment();
    for (const asset of FANTASY_ASSET_CATALOG) {
      const card = document.createElement('button'); card.type = 'button'; card.className = 'fantasy-asset-card'; card.title = asset.description;
      card.innerHTML = `<span class="fantasy-asset-card__sprite" aria-hidden="true"></span><span class="fantasy-asset-card__name">${asset.name}</span><small>${asset.category}</small>`;
      const sprite = card.querySelector('.fantasy-asset-card__sprite'); sprite.style.backgroundImage = `url("${asset.sheet}")`; sprite.style.backgroundSize = '500% 100%'; sprite.style.backgroundPosition = `${asset.frame * 25}% 50%`;
      card.addEventListener('click', () => { window.taskbarHeroFantasy = { selected: asset, select: id => FANTASY_ASSET_CATALOG.find(entry => entry.id === id) ?? null }; for (const other of grid.querySelectorAll('.fantasy-asset-card')) other.classList.remove('is-selected'); card.classList.add('is-selected'); });
      fragment.appendChild(card);
    }
    grid.appendChild(fragment);
  };
  close.addEventListener('click', () => { panel.hidden = true; });
  command.addEventListener('click', () => { panel.hidden = !panel.hidden; if (!panel.hidden) renderAssets(); });
  panel.hidden = true; document.body.appendChild(panel);
}

addMobileUpdateButton();
addFantasyAssetPanel();
window.taskbarHeroRPG = { menu };
