import GridSquare from "./gridSquare.js";

export default class Grid {
    constructor(player, manager, renderer){
        this.player = player;
        this.enemies = [];
        this.manager = manager;
        this.renderer = renderer
    }

    initialize() {
        this.squareWidth = 40;
        this.squareHeight = 40;
        this.grid = [];
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y <= 15; y++){
                this.grid.push(new GridSquare(x, y));
            }
        }

        this.getGridSquare(...Object.values(this.player.getPosition()))
            .setObject(this.player);
        this.renderer.drawGrid();
        this.#updateGrid();
    }

    action = (action) => {
        if (action == 'left' || action == 'right') {
            this.#movePlayer(action);
        } 

        if (action == 'up') {
           // this.shoot();
        }
        this.#updateGrid();
    }

    #updateGrid = () => {
        this.grid.forEach((gridSquare) => {
            this.renderer.updateGrid(gridSquare);
        });
    }

    #movePlayer = (action) => {
        this.getGridSquare(...Object.values(this.player.getPosition())).setObject(null);
        this.player[action]();
        this.getGridSquare(...Object.values(this.player.getPosition())).setObject(this.player);
    }

    getGridSquare = (x,y) => this.grid.find(square => square.getX() == x && square.getY() == y)
}