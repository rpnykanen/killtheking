type events = {
    [index: string]: string;
} 

export default class KeyboardEvent implements IEvent {

    static EVENTNAME: string = 'keyboard.event';

    static events: events = {
        'ArrowLeft': 'left',
        'ArrowUp': 'shoot',
        'ArrowRight': 'right',
        'ArrowDown': 'skip'
    };

    private _event: string;

    constructor(event: string ) { this._event = KeyboardEvent.events[event]; }

    static create = (event: string) => new KeyboardEvent(event);

    get event(): string | null { return this._event; }

    get eventName() { return KeyboardEvent.EVENTNAME; }
}