import GridSquare from "../../grid/GridSquare.js";
import Position from "../../grid/Position";

export default class GameUpdateEvent implements IEvent {
    static eventName: string = 'game.update';

    constructor(private gridSquares: GridSquare[]) {
    }

    static create = (gridSquares: GridSquare[]) => {
        return new GameUpdateEvent(gridSquares);
    }

    public getGridSquares = () => this.gridSquares;
}