import Player from './character/Player.js';
import pubsub from './event/PubSub.js';
import GameUpdateEvent from './event/events/GameUpdateEvent.js';
import KeyboardEvent from './event/events/KeyboardEvent.js';
import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
export default class Game {
    constructor() {
        this.spawnEnemies = () => {
            this.grid.spawnEnemy();
        };
        this.event = (keyName) => {
            pubsub.publish(KeyboardEvent.create(keyName));
        };
        this.grid = new Grid();
        this.renderer = new Renderer();
        this.player = new Player();
        this.grid.updateGrid();
        pubsub.subscribe(GameUpdateEvent.EVENTNAME, this.spawnEnemies);
    }
}
