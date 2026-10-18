// Browser/Android fallback for the Electron IPC bridge.
// Electron's preload.js still supplies the real bridge in the desktop build.
// Android packages the same src/ tree inside a WebView, so this fallback keeps
// saves and inventory actions local to the WebView origin.
(function installBrowserBridge() {
  if (window.taskbarHero) return;

  const SAVE_KEY = 'taskbar-hero-save-v1';

  window.taskbarHero = {
    async loadGame() {
      const raw = localStorage.getItem(SAVE_KEY);
      return raw ? JSON.parse(raw) : null;
    },

    async saveGame(data) {
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    },

    setIgnoreMouse() {},

    openInventory() {
      window.location.href = 'inventory.html';
    },
  };

  let syncHandler = null;

  async function loadState() {
    const [{ GameState }, { HERO_CLASSES, MAX_PARTY_SIZE }] = await Promise.all([
      import('./state/GameState.js'),
      import('./config/heroClasses.js'),
    ]);
    const saved = await window.taskbarHero.loadGame();
    return { state: GameState.fromSave(saved), HERO_CLASSES, MAX_PARTY_SIZE };
  }

  async function syncInventory() {
    if (!syncHandler) return;
    const { state, HERO_CLASSES, MAX_PARTY_SIZE } = await loadState();
    const partyClasses = new Set(state.party.map((hero) => hero.classId));
    const recruitable = Object.entries(HERO_CLASSES)
      .filter(([classId]) => !partyClasses.has(classId))
      .map(([classId, def]) => ({ classId, label: def.label, cost: def.recruitCost }));

    syncHandler({
      gold: state.gold,
      partyFull: state.party.length >= MAX_PARTY_SIZE,
      party: state.party.map((hero) => hero.serialize()),
      recruitable,
      inventory: state.inventory,
    });
  }

  window.inventoryBridge = {
    onSyncData(handler) {
      syncHandler = handler;
    },

    async requestSync() {
      try { await syncInventory(); } catch (error) { console.error(error); }
    },

    async recruitHero(classId) {
      const { state, HERO_CLASSES, MAX_PARTY_SIZE } = await loadState();
      const def = HERO_CLASSES[classId];
      if (!def || state.party.length >= MAX_PARTY_SIZE) return;
      if (state.party.some((hero) => hero.classId === classId)) return;
      if (state.gold < def.recruitCost) return;
      state.gold -= def.recruitCost;
      state.addHero(classId);
      await window.taskbarHero.saveGame(state.serialize());
      await syncInventory();
    },

    async equipItem(heroId, itemId) {
      const { state } = await loadState();
      const hero = state.party.find((candidate) => candidate.id === heroId);
      const item = state.inventory.find((candidate) => candidate.id === itemId);
      if (!hero || !item || !hero.equip(item)) return;
      await window.taskbarHero.saveGame(state.serialize());
      await syncInventory();
    },
  };
})();
