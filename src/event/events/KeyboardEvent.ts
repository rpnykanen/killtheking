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

    event: string | null;

    constructor(event: string) {
        this.event = KeyboardEvent.events[event];
    }

    static create = (event: string) => {
        return new KeyboardEvent(event);
    }

    getEvent = (): string | null => this.event;

}