import { WORLD_EVENTS, WORLD_BOSSES } from '../rpg/eventData.js';

export class EventSystem {
  static listEvents() { return [...WORLD_EVENTS]; }
  static listBosses() { return [...WORLD_BOSSES]; }
  static createEvent(eventId, startAt = Date.now()) {
    const definition = WORLD_EVENTS.find((event) => event.id === eventId);
    if (!definition) return null;
    return { id: `${eventId}-${startAt}`, eventId, state: 'active', startAt, progress: 0 };
  }
  static advance(instance, amount = 1) {
    if (!instance || instance.state !== 'active') return instance;
    const progress = Math.max(0, instance.progress + amount);
    return { ...instance, progress, state: progress >= 100 ? 'completed' : 'active' };
  }
}
