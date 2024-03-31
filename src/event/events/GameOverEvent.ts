import IEvent from "./IEvent";

export default class GameOverEvent implements IEvent {

  static EVENTNAME = 'game.over';

  private endTime: number;

  constructor(private _win: boolean) { this.endTime = Date.now(); }

  get getEndTime() { return this.endTime; }

  get eventName(): string { return 'game.over'; }

  get win(): boolean {
    return this._win
  }

}