import IEvent from "./IEvent";

export default class GameActionEvent implements IEvent {
  static EVENTNAME = 'game.action';

  private _currentTime = 0;

  constructor() { this._currentTime = Date.now(); }

  get currentTime(): number {
    return this._currentTime;
  }

  get eventName(): string { return  'game.action'; }
}