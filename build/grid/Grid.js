import GridSquare from "./GridSquare.js";
export default class Grid {
    constructor() {
        this.grid = [];
        this.enemies = [];
        this.actions = [];
        this.buildGrid = () => {
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y <= 15; y++) {
                    this.grid.push(new GridSquare(x, y));
                }
            }
        };
        this.getGridSquare = (position) => this.grid.find((gridSquare) => gridSquare.getPosition().equals(position)) ?? null;
        this.buildGrid();
        this.gridInitialState();
    }
    gridInitialState() {
    }
}
