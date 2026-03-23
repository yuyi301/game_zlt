export class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(eventName, handler) {
    if (!this.listeners.has(eventName)) this.listeners.set(eventName, []);
    this.listeners.get(eventName).push(handler);
  }

  emit(eventName, payload) {
    const handlers = this.listeners.get(eventName) || [];
    handlers.forEach((handler) => handler(payload));
  }
}
