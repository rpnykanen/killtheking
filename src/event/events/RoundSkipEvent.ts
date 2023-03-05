export default class RoundSkipEvent implements IEvent {
    static EVENTNAME: string = 'round.skip';

    static create = () => new RoundSkipEvent();

    get eventName() { return RoundSkipEvent.EVENTNAME; }
}