import GameActionEvent from './event/events/GameActionEvent.js';
import GameOverEvent from './event/events/GameOverEvent.js';
import pubsub from './event/PubSub.js';
import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
import State from "./State.js";
export default class Game {
    constructor() {
        this.action = (keyName) => {
            if (!this.state.isActive()) {
                return;
            }
            this.grid.action(keyName);
            if (this.state.getKills() === 10 && this.boss === false) {
                this.grid.spawnBoss();
                this.boss = true;
            }
            pubsub.publish(new GameActionEvent());
        };
        this.startGame = () => {
            this.state.start();
        };
        this.endGame = () => {
            this.state.end();
            this.grid.end();
        };
        this.restart = () => {
            this.grid = new Grid();
            this.renderer = new Renderer();
            this.state = new State();
        };
        pubsub.subscribe(GameOverEvent.EVENTNAME, this.endGame);
        this.renderer = new Renderer();
        this.grid = new Grid();
        this.state = new State();
        this.boss = false;
    }
}
