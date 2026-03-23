export class Store {
  constructor(initialState) {
    this.state = initialState;
    this.subscribers = [];
  }

  getState() {
    return this.state;
  }

  patch(nextPartial) {
    this.state = { ...this.state, ...nextPartial };
    this.subscribers.forEach((fn) => fn(this.state));
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }
}
