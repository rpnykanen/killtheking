type Events = {
    [index: string]: CallableFunction[];
}

class PubSub {
    // TODO use set?
    private events: Events;
    private instance:PubSub | null;

    constructor() {
        if (this.instance) {
          throw new Error("New instance cannot be created!");
        }
        this.events = {};
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

    publish = (eventName: string, event: string): void => {
        if (!this.events[eventName]) return;
        this.events[eventName]
            .forEach(callback => callback(event));
    }
}

const pubsub = Object.freeze(new PubSub());

export default pubsub;