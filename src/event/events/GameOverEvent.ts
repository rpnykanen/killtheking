import IEvent from "./IEvent";

export default class GameOverEvent implements IEvent {
  static EVENTNAME = 'game.over';

  constructor(private _win: boolean) { }

  get eventName(): string { return 'game.over'; }

  get win(): boolean { return this._win }
}