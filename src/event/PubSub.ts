type Events = {
    [index: string]: CallableFunction[];
}

class PubSub {
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

    unsubscribe = (event: IEvent, callback: CallableFunction): void => {
        if (this.events[event.eventName]) {
            this.events[event.eventName] = this.events[event.eventName].filter(fn => fn !== callback);
        }
    }

    publish = (event: IEvent): void => {
        if (!this.events[event.eventName]) return;
        this.events[event.eventName]
            .forEach(callback => callback(event));
    }
}

const pubsub = Object.freeze(new PubSub());

export default pubsub;