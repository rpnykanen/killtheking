export default class RoundSkipEvent implements IEvent {
  static EVENTNAME = 'round.skip';
  get eventName() { return RoundSkipEvent.EVENTNAME; }
}