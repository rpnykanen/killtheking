import GridSquare from "@board/GridSquare";
import IEvent from "./IEvent";

export default class GameUpdateEvent implements IEvent {
  static EVENTNAME = 'game.update';

  constructor(private _gridSquares: GridSquare[]) { }

  get gridSquares() { return this._gridSquares; }

  get eventName() { return 'game.update'; }
}