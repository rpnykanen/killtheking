import IEvent from "./IEvent";

export default class NewGameEvent implements IEvent {
  static EVENTNAME = 'game.new';

  get eventName(): string { return 'game.new' }
}