type Events = {
  [index: string]: CallableFunction[];
}

class PubSub {
  private _events: Events;

  private instance: PubSub | null;

  constructor() {
    if (this.instance) {
      throw new Error("New instance cannot be created!");
    }
    this._events = {};
    this.instance = this;
  }

  subscribe = (eventName: string, callback: CallableFunction): void => {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);
  }

  unsubscribe = (eventName: string, callback: CallableFunction): void => {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(fn => fn !== callback);
    }
  }

  // todo throw exception instead of return ?
  publish = (event: IEvent): void => {
    if (!this.events[event.eventName]) return;
    this.events[event.eventName]
      .forEach(callback => callback(event));
  }

  get events(): Events {
    return this._events;
  }

}

const pubsub = Object.freeze(new PubSub());

export default pubsub;