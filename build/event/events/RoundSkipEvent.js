export default class RoundSkipEvent {
    get eventName() { return RoundSkipEvent.EVENTNAME; }
}
RoundSkipEvent.EVENTNAME = 'round.skip';
RoundSkipEvent.create = () => new RoundSkipEvent();
