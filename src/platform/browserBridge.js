// Browser/Android fallback for the Electron IPC bridge.
// Electron's preload.js supplies the real bridge in the desktop build.
// Android packages src/ inside a WebView and persists its save locally.
(function installBrowserBridge() {
  if (window.taskbarHero) return;

  const SAVE_KEY = 'taskbar-hero-save-v1';
  let inventorySnapshot = null;
  let inventorySyncRequestHandler = null;
  let equipItemHandler = null;
  let recruitHeroHandler = null;

  window.taskbarHero = {
    async loadGame() {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      try {
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === 'object' ? parsed : null;
      } catch (error) {
        console.warn('Taskbar Hero save is unreadable; starting a fresh save.', error);
        return null;
      }
    },
    async saveGame(data) {
      try { localStorage.setItem(SAVE_KEY, JSON.stringify(data)); }
      catch (error) { console.error('Unable to save Taskbar Hero progress.', error); throw error; }
    },
    setIgnoreMouse() {},
    openInventory() { window.location.href = 'inventory.html'; },
    onProvideInventorySync(handler) { inventorySyncRequestHandler = handler; },
    sendInventorySync(snapshot) { inventorySnapshot = snapshot ?? null; },
    onEquipItem(handler) { equipItemHandler = handler; },
    onRecruitHero(handler) { recruitHeroHandler = handler; },
    getLastInventorySnapshot() { return inventorySnapshot; },
    requestInventorySync() { inventorySyncRequestHandler?.(); },
    requestEquipItem(payload) { equipItemHandler?.(payload); },
    requestRecruitHero(classId) { recruitHeroHandler?.(classId); },
  };

  let syncHandler = null;
  let syncInFlight = false;

  async function loadState() {
    const [{ GameState }, { HERO_CLASSES, MAX_PARTY_SIZE }] = await Promise.all([
      import('../state/GameState.js'),
      import('../config/heroClasses.js'),
    ]);
    const saved = await window.taskbarHero.loadGame();
    let state;
    try { state = GameState.fromSave(saved); }
    catch (error) {
      console.warn('Unable to load saved party; using a fresh game state.', error);
      state = new GameState();
    }
    return { state, HERO_CLASSES, MAX_PARTY_SIZE };
  }

  async function syncInventory() {
    if (!syncHandler || syncInFlight) return;
    syncInFlight = true;
    try {
      const { state, HERO_CLASSES, MAX_PARTY_SIZE } = await loadState();
      const partyClasses = new Set(state.party.map((hero) => hero.classId));
      const recruitable = Object.entries(HERO_CLASSES)
        .filter(([classId, def]) => def.recruitCost > 0 && !partyClasses.has(classId))
        .map(([classId, def]) => ({ classId, label: def.label, cost: def.recruitCost }));
      syncHandler({
        gold: state.gold,
        partyFull: state.party.length >= MAX_PARTY_SIZE,
        party: state.party.map((hero) => hero.serialize()),
        recruitable,
        inventory: state.inventory,
      });
    } finally { syncInFlight = false; }
  }

  window.inventoryBridge = {
    onSyncData(handler) { syncHandler = handler; },
    async requestSync() {
      try { await syncInventory(); }
      catch (error) { console.error('Unable to refresh Taskbar Hero inventory.', error); }
    },
    async recruitHero(classId) {
      try {
        const { state, HERO_CLASSES, MAX_PARTY_SIZE } = await loadState();
        const def = HERO_CLASSES[classId];
        if (!def || def.recruitCost <= 0 || state.party.length >= MAX_PARTY_SIZE) return;
        if (state.party.some((hero) => hero.classId === classId)) return;
        if (state.gold < def.recruitCost) return;
        state.gold -= def.recruitCost;
        state.addHero(classId);
        await window.taskbarHero.saveGame(state.serialize());
        await syncInventory();
      } catch (error) { console.error('Unable to recruit hero.', error); }
    },
    async equipItem(heroId, itemId) {
      try {
        const { state } = await loadState();
        const hero = state.party.find((candidate) => candidate.id === heroId);
        const item = state.inventory.find((candidate) => candidate.id === itemId);
        if (!hero || !item || typeof hero.equip !== 'function' || !hero.equip(item)) return;
        await window.taskbarHero.saveGame(state.serialize());
        await syncInventory();
      } catch (error) { console.error('Unable to equip item.', error); }
    },
  };
})();
