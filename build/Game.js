import Player from './character/Player.js';
import pubsub from './event/PubSub.js';
import GameUpdateEvent from './event/events/GameUpdateEvent.js';
import KeyboardEvent from './event/events/KeyboardEvent.js';
import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
export default class Game {
    constructor() {
        this.spawnEnemies = () => {
            this.grid.spawnEnemies();
        };
        this.event = (keyName) => {
            pubsub.publish(KeyboardEvent.eventName, keyName);
        };
        this.grid = new Grid();
        this.renderer = new Renderer();
        this.player = new Player();
        this.grid.updateGrid();
        pubsub.subscribe(GameUpdateEvent.eventName, this.spawnEnemies);
    }
}
