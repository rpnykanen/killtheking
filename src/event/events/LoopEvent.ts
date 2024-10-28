import IEvent from "@event/events/IEvent";

export default class LoopEvent implements IEvent {
  static EVENT_NAME = 'game.loop';

  get eventName(): string { return LoopEvent.EVENT_NAME; }
}