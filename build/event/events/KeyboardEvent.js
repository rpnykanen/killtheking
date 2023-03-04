export default class KeyboardEvent {
    constructor(_event) {
        this._event = _event;
        this._event = KeyboardEvent.events[this._event];
    }
    get event() { return this.event; }
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
