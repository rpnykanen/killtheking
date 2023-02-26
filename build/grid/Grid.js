import GridSquare from "./GridSquare.js";
import PubSub from "../event/PubSub.js";
import PlayerMoveEvent from "../event/events/PlayerMoveEvent.js";
import CharacterSpawnEvent from "../event/events/CharacterSpawnEvent.js";
import pubsub from "../event/PubSub.js";
import GameUpdateEvent from "../event/events/GameUpdateEvent.js";
export default class Grid {
    constructor() {
        this.grid = [];
        this.enemies = [];
        this.changes = [];
        this.spawn = (spawnEvent) => {
            const character = spawnEvent.getCharacter();
            const position = character.position;
            this.getGridSquare(position)?.removeCharacter();
            const square = this.getGridSquare(position);
            if (!square) {
                return;
            }
            square.setCharacter(character);
            this.changes.push(square);
        };
        this.updateGrid = () => {
            pubsub.publish(GameUpdateEvent.eventName, this.changes);
        };
        this.move = (playerMoveEvent) => {
            const oldPos = playerMoveEvent.getOldPosition();
            const newPos = playerMoveEvent.getNewPosition();
        };
        this.buildGrid = () => {
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y <= 15; y++) {
                    this.grid.push(new GridSquare(x, y));
                }
            }
        };
        this.getGridSquare = (position) => this.grid.find((gridSquare) => gridSquare.getPosition().equals(position)) ?? null;
        PubSub.subscribe(CharacterSpawnEvent.eventName, this.spawn);
        PubSub.subscribe(PlayerMoveEvent.eventName, this.move);
        this.buildGrid();
        this.gridInitialState();
    }
    gridInitialState() {
    }
}
