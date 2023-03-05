import GridSquare from "../../grid/GridSquare.js";

export default class GameUpdateEvent implements IEvent {
    static EVENTNAME: string = 'game.update';

    constructor(private _gridSquares: GridSquare[]) {}

    static create = (gridSquares: GridSquare[]) => new GameUpdateEvent(gridSquares);

    get gridSquares() { return this._gridSquares; }

    get eventName() { return GameUpdateEvent.EVENTNAME; }
}