import Enemy from "../character/Enemy.js";
import GridSquare from "./GridSquare.js";
import PubSub from "../event/PubSub.js";
import Position from "./Position.js";
import PlayerMoveEvent from "../event/events/PlayerMoveEvent.js";
import CharacterSpawnEvent from "../event/events/CharacterSpawnEvent.js";
import pubsub from "../event/PubSub.js";
import GameUpdateEvent from "../event/events/GameUpdateEvent.js";

export default class Grid {

    private grid: GridSquare[] = [];

    private enemies: Enemy[] = [];

    private changes: GridSquare[] = [];

    constructor(){
        //this.pubsub = new PubSub();

        PubSub.subscribe(CharacterSpawnEvent.eventName, this.spawn);
        PubSub.subscribe(PlayerMoveEvent.eventName, this.move);
        /*
        PubSub.subscribe('player.shoot', this.shoot);
        PubSub.subscribe('player.skip', this.genericActions);
        PubSub.subscribe('enemy.death', this.removeEnemy)
        */
       this.buildGrid()
       this.gridInitialState();
    }

    private spawn = (spawnEvent: CharacterSpawnEvent) => {
        const character = spawnEvent.getCharacter();
        const position = character.position;
        // const oldPosition = character.oldPosition;
        this.getGridSquare(position)?.removeCharacter();
        const square = this.getGridSquare(position);
        if (!square) {
            return;
        }
        square.setCharacter(character);
        this.changes.push(square);
        //this.updateGrid();
        // TODO empty changes.
    }

    updateGrid = () => {
        pubsub.publish(GameUpdateEvent.eventName, this.changes);
        // this used to have renderer.
    }

    private move = (playerMoveEvent: PlayerMoveEvent) => {
        const oldPos = playerMoveEvent.getOldPosition();
        const newPos = playerMoveEvent.getNewPosition();

        // const character = this.getGridSquare(oldPos).getObject();

        /*
        this.actions.push(...Object.values(positions))
        const {oldPos, newPos} = positions;
        const character = this.getGridSquare(oldPos).getObject();
        this.getGridSquare(oldPos)?.removeCharacter();
        if (character) this.getGridSquare(newPos).setObject(character);

        this.#genericActions();
        */
    }

    private buildGrid = () => {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y <= 15; y++){
                this.grid.push(new GridSquare(x, y));
            }
        }
        
        //const x = Math.floor(Math.random() * 10);
        //const enemy = new Pawn(x,0,1);

        //this.getGridSquare(enemy.getPosition()).setObject(enemy);

        //this.enemies.push(enemy);
    }

    private gridInitialState() {
        /*
        this.grid(this.player.getPosition())
            .setObject(this.player);
        */
       /*
        this.renderer.drawGrid();
        this.renderer.updateGrid(this.getGridSquare(this.player.getPosition()));
        */
    }

    private getGridSquare = (position: Position): GridSquare | null => this.grid.find((gridSquare: GridSquare) => gridSquare.getPosition().equals(position)) ?? null;

}