import Enemy from "../../character/Enemy.js";

export default class GameStartEvent implements IEvent {

  static EVENTNAME = 'game.start';

  private startTime: number;

  constructor() {
    this.startTime = Date.now();
  }

  get getStartTime() { return this.startTime; }

  get eventName(): string {
    return GameStartEvent.EVENTNAME;
  }

}