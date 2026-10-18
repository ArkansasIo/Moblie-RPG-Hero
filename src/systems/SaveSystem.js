const DEFAULT_KEY = 'moblie-rpg-hero-save-v1';

export class SaveSystem {
  static save(state, key = DEFAULT_KEY, storage = globalThis.localStorage) {
    const payload = { version: 1, savedAt: Date.now(), state: typeof state?.serialize === 'function' ? state.serialize() : state };
    if (!storage) return payload;
    storage.setItem(key, JSON.stringify(payload));
    return payload;
  }

  static load(key = DEFAULT_KEY, storage = globalThis.localStorage) {
    if (!storage) return null;
    const raw = storage.getItem(key);
    if (!raw) return null;
    try { const payload = JSON.parse(raw); return payload?.state ?? null; } catch { return null; }
  }

  static remove(key = DEFAULT_KEY, storage = globalThis.localStorage) { storage?.removeItem(key); }
  static exportJSON(state) { return JSON.stringify({ version: 1, exportedAt: Date.now(), state }, null, 2); }
  static importJSON(text) { const parsed = JSON.parse(text); return parsed?.state ?? parsed; }
}

export { DEFAULT_KEY };
