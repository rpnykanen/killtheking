import GameRestartEvent from './event/events/GameRestartEvent.js';
import pubsub from './event/PubSub.js';
import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
import State from "./State.js";
export default class Game {
    constructor() {
        this.action = (keyName) => {
            this.grid.action(keyName);
            this.test();
        };
        this.startGame = () => {
            this.state.start();
        };
        this.endGame = () => {
            this.state.end();
        };
        this.test = () => {
            if (this.state.getKills() === 10 && this.boss === false) {
                this.grid.spawnBoss();
                this.boss = true;
            }
        };
        this.restart = () => {
            this.grid = new Grid();
            this.renderer = new Renderer();
            this.state = new State();
        };
        pubsub.subscribe(GameRestartEvent.EVENTNAME, this.restart);
        this.renderer = new Renderer();
        this.grid = new Grid();
        this.state = new State();
        this.boss = false;
    }
}
