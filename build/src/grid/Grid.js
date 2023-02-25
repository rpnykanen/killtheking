import GridSquare from "./GridSquare";
export default class Grid {
    constructor() {
        this.buildGrid = () => {
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y <= 15; y++) {
                    this.grid.push(new GridSquare(x, y));
                }
            }
            //const x = Math.floor(Math.random() * 10);
            //const enemy = new Pawn(x,0,1);
            //this.getGridSquare(enemy.getPosition()).setObject(enemy);
            //this.enemies.push(enemy);
        };
        this.getGridSquare = (position) => this.grid.find((gridSquare) => gridSquare.getPosition().equals(position)) ?? null;
        this.enemies = [];
        this.actions = [];
        //this.pubsub = new PubSub();
        /*
        PubSub.subscribe('player.move', this.move);
        PubSub.subscribe('player.shoot', this.shoot);
        PubSub.subscribe('player.skip', this.genericActions);
        PubSub.subscribe('enemy.death', this.removeEnemy)
        */
        this.buildGrid();
        this.gridInitialState();
    }
    gridInitialState() {
        /*
        this.grid(this.player.getPosition())
            .setObject(this.player);
        */
        /*
         this.renderer.drawGrid();
         this.renderer.updateGrid(this.getGridSquare(this.player.getPosition()));
         */
    }
}
