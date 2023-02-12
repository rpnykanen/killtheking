import GridSquare from "./gridSquare.js";

export default class Grid {
    constructor(squareWidth, squareHeight){
        this.grid = [];
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 15; y++){
                this.grid.push(new GridSquare(x, y));
            }
        }
    }

    getGridSquare = (x,y) => this.grid.find(square => square.getX() == x && square.getY() == y)
}