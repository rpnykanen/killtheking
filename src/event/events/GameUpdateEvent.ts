import GridSquare from "../../grid/GridSquare.js";

export default class GameUpdateEvent implements IEvent {
    static eventName: string = 'game.update';

    constructor(private _gridSquares: GridSquare[]) {
    }

    static create = (gridSquares: GridSquare[]) => {
        return new GameUpdateEvent(gridSquares);
    }

    get gridSquares() { return this._gridSquares; }
}