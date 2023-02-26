export default class KeyboardEvent {
    constructor(event) {
        this.getEvent = () => this.event;
        this.event = KeyboardEvent.events[event];
    }
}
KeyboardEvent.eventName = 'keyboard.event';
KeyboardEvent.events = {
    'ArrowLeft': 'left',
    'ArrowUp': 'shoot',
    'ArrowRight': 'right',
    'ArrowDown': 'skip'
};
KeyboardEvent.create = (event) => {
    return new KeyboardEvent(event);
};
