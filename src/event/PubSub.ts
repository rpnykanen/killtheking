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
        console.log(`subbed to ${eventName}`);
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
    }

    unsubscribe = (eventName: string, callback: CallableFunction): void => {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(fn => fn !== callback);
        }
    }

    publish = (eventName: string, eventObject: IEvent): void => {
        console.log(`published to ${eventName}`);
        if (!this.events[eventName]) return;
        this.events[eventName]
            .forEach(callback => callback(eventObject));
    }
}

const pubsub = Object.freeze(new PubSub());

export default pubsub;