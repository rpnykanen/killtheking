type events = {
    [index: string]: string;
} 

export default class KeyboardEvent implements IEvent {

    static eventName: string = 'keyboard.event';

    static events: events = {
        'ArrowLeft': 'left',
        'ArrowUp': 'shoot',
        'ArrowRight': 'right',
        'ArrowDown': 'skip'
    };

    constructor(private _event: string ) {
        this._event = KeyboardEvent.events[this._event];
    }

    static create = (event: string) => {
        return new KeyboardEvent(event);
    }

    get event(): string | null { return this.event; }

}