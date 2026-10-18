import { createRPGMenu } from './RPGMenuController.js';
import { FANTASY_ASSET_CATALOG } from './FantasyAssetCatalog.js';
import { EXTENDED_ASSET_CATALOG, EXTENDED_ASSET_COUNTS } from './ExtendedAssetCatalog.js';

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
    .then(info => { if (!info) return; update.title = `Build ${info.version} • ${info.buildId} • patch ${info.patch}`; update.setAttribute('aria-label', `Update Mo RPG Hero. Current build ${info.version}, ${info.buildId}`); })
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
  command.className = 'rpg-command-button fantasy-assets-button'; command.textContent = 'ASSETS'; command.title = 'Open fantasy class, equipment, monster and biome assets'; document.body.appendChild(command);
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

function addExtendedAssetPanel() {
  const panel = document.createElement('aside');
  panel.className = 'fantasy-asset-panel extended-asset-panel';
  panel.setAttribute('aria-label', 'Extended Mo RPG Hero asset catalog');
  const counts = Object.entries(EXTENDED_ASSET_COUNTS).map(([category, count]) => `${category}: ${count}`).join(' • ');
  panel.innerHTML = `<div class="fantasy-codex__bar"><strong>Mo RPG Hero — Extended Asset Vault</strong><button type="button" aria-label="Close extended assets">×</button></div><div class="extended-asset-summary">${EXTENDED_ASSET_CATALOG.length} catalogued assets • ${counts}</div><div class="extended-asset-filters"></div><div class="fantasy-asset-panel__grid"></div>`;
  const grid = panel.querySelector('.fantasy-asset-panel__grid');
  const filters = panel.querySelector('.extended-asset-filters');
  const close = panel.querySelector('.fantasy-codex__bar button');
  const command = document.createElement('button');
  command.className = 'rpg-command-button extended-assets-button'; command.textContent = 'ASSET VAULT'; command.title = 'Open the complete extended RPG asset catalog'; document.body.appendChild(command);
  const categories = ['all', ...Object.keys(EXTENDED_ASSET_COUNTS)];
  let selectedCategory = 'all';
  const render = () => {
    grid.textContent = '';
    const assets = selectedCategory === 'all' ? EXTENDED_ASSET_CATALOG : EXTENDED_ASSET_CATALOG.filter(asset => asset.category === selectedCategory);
    const fragment = document.createDocumentFragment();
    for (const asset of assets) {
      const card = document.createElement('button'); card.type = 'button'; card.className = 'fantasy-asset-card extended-asset-card'; card.title = asset.path;
      card.innerHTML = `<span class="extended-asset-card__icon" aria-hidden="true">✦</span><span class="fantasy-asset-card__name">${asset.name}</span><small>${asset.category}</small>`;
      card.addEventListener('click', () => { window.taskbarHeroExtendedAssets = { selected: asset, select: id => EXTENDED_ASSET_CATALOG.find(entry => entry.id === id) ?? null }; for (const other of grid.querySelectorAll('.fantasy-asset-card')) other.classList.remove('is-selected'); card.classList.add('is-selected'); });
      fragment.appendChild(card);
    }
    grid.appendChild(fragment);
  };
  for (const category of categories) {
    const filter = document.createElement('button'); filter.type = 'button'; filter.className = 'extended-asset-filter'; filter.textContent = category === 'all' ? `ALL (${EXTENDED_ASSET_CATALOG.length})` : `${category.toUpperCase()} (${EXTENDED_ASSET_COUNTS[category]})`;
    filter.addEventListener('click', () => { selectedCategory = category; for (const item of filters.children) item.classList.remove('is-selected'); filter.classList.add('is-selected'); render(); }); filters.appendChild(filter);
  }
  filters.firstElementChild?.classList.add('is-selected');
  close.addEventListener('click', () => { panel.hidden = true; });
  command.addEventListener('click', () => { panel.hidden = !panel.hidden; if (!panel.hidden) render(); });
  panel.hidden = true; document.body.appendChild(panel);
}

addMobileUpdateButton();
addFantasyAssetPanel();
addExtendedAssetPanel();
window.taskbarHeroRPG = { menu };
window.taskbarHeroAssetCatalog = EXTENDED_ASSET_CATALOG;
