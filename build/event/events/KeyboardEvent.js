export default class KeyboardEvent {
    constructor(event) { this._event = KeyboardEvent.events[event]; }
    get event() { return this._event; }
    get eventName() { return KeyboardEvent.EVENTNAME; }
}
KeyboardEvent.EVENTNAME = 'keyboard.event';
KeyboardEvent.events = {
    'ArrowLeft': 'left',
    'ArrowUp': 'shoot',
    'ArrowRight': 'right',
    'ArrowDown': 'skip'
};
KeyboardEvent.create = (event) => new KeyboardEvent(event);
