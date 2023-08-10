import pubsub from './event/PubSub.js';
import GameUpdateEvent from './event/events/GameUpdateEvent.js';
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
            this.grid.action(keyName);
        };
        this.startGame = () => {
            this.state.start();
        };
        this.endGame = () => {
            this.state.stop();
        };
        this.grid = new Grid();
        this.renderer = new Renderer();
        this.state = new State();
        this.listenEvents();
    }
}
