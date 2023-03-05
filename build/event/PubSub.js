class PubSub {
    constructor() {
        this.subscribe = (eventName, callback) => {
            this.events[eventName] = this.events[eventName] || [];
            this.events[eventName].push(callback);
        };
        this.unsubscribe = (event, callback) => {
            if (this.events[event.eventName]) {
                this.events[event.eventName] = this.events[event.eventName].filter(fn => fn !== callback);
            }
        };
        this.publish = (event) => {
            if (!this.events[event.eventName])
                return;
            this.events[event.eventName]
                .forEach(callback => callback(event));
        };
        if (this.instance) {
            throw new Error("New instance cannot be created!");
        }
        this.events = {};
        this.instance = this;
    }
}
const pubsub = Object.freeze(new PubSub());
export default pubsub;
