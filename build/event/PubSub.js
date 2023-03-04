class PubSub {
    constructor() {
        this.subscribe = (eventName, callback) => {
            this.events[eventName] = this.events[eventName] || [];
            this.events[eventName].push(callback);
        };
        this.unsubscribe = (eventName, callback) => {
            if (this.events[eventName]) {
                this.events[eventName] = this.events[eventName].filter(fn => fn !== callback);
            }
        };
        this.publish = (eventName, eventObject) => {
            if (!this.events[eventName])
                return;
            this.events[eventName]
                .forEach(callback => callback(eventObject));
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
