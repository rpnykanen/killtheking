import Player from './character/Player.js';
import pubsub from './event/PubSub.js';
import GameUpdateEvent from './event/events/GameUpdateEvent.js';
import KeyboardEvent from './event/events/KeyboardEvent.js';
import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
import State from "./State.js";
export default class Game {
    constructor() {
        this.listenEvents = () => {
            pubsub.subscribe(GameUpdateEvent.EVENTNAME, this.spawnEnemies);
        };
        this.spawnEnemies = () => {
            this.grid.spawnEnemy();
        };
        this.event = (keyName) => {
            pubsub.publish(KeyboardEvent.create(keyName));
        };
        this.startGame = () => {
            this.state.start();
        };
        this.endGame = () => {
            this.state.stop();
        };
        this.grid = new Grid();
        this.renderer = new Renderer();
        this.player = new Player();
        this.grid.updateGrid();
        this.state = new State();
        this.listenEvents();
    }
}
