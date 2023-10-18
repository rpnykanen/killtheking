export default class RoundSkipEvent implements IEvent {
  static EVENTNAME = 'round.skip';

  static create = () => new RoundSkipEvent();

  get eventName() { return RoundSkipEvent.EVENTNAME; }
}