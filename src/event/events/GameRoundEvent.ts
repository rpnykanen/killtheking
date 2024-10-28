import GridSquare from "@board/GridSquare";
import IEvent from "./IEvent";

export default class GameRoundEvent implements IEvent {
  static EVENTNAME = 'game.round';

  constructor(private _gridSquares: GridSquare[]) { }

  get gridSquares() { return this._gridSquares; }

  get eventName() { return 'game.round'; }
}