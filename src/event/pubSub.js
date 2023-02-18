class PubSub {
    events = {};
    instance = null;

    constructor() {
        if (this.instance) {
          throw new Error("New instance cannot be created!");
        }
        this.instance = this;
    }
    
    subscribe = (eventName, callback) => {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
    }

    unsubscribe = (eventName, callback) => {
        if (this.events[eventName]){
            this.events[eventName] = this.events[eventName].filter(fn => fn !== callback);
        }
    }

    publish = (eventName, event) => {
        if (!this.events[eventName]) return;
        this.events[eventName]
            .forEach(callback => callback(event));
    }
}

const pubsub = Object.freeze(new PubSub());

export default pubsub;
