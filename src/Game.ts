import Player from './character/Player.js';
import GameActionEvent from './event/events/GameActionEvent.js';
import GameOverEvent from './event/events/GameOverEvent.js';
import pubsub from './event/PubSub.js';
import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
import State from "./State.js";

export default class Game {
    grid: Grid;
    renderer: Renderer;
    player: Player;
    state: State;
    boss: boolean;

    constructor() {
        pubsub.subscribe(GameOverEvent.EVENTNAME, this.endGame);
        this.grid = new Grid();
        this.renderer = new Renderer();
        this.state = new State();
        this.boss = false;
    }

    action = (keyName: string) => {
        if (!this.state.isActive()) {
            return;
        }

        this.grid.action(keyName)
        if (this.state.getKills() === 10 && this.boss === false) {
            this.grid.spawnBoss();
            this.boss = true;
        }
        pubsub.publish(new GameActionEvent());
    }

    startGame = () => {
        this.state.start();
    }

    endGame = () => {
        this.state.end();
        this.grid.end();
    }

    restart = () => {
        this.grid = new Grid();
        this.renderer = new Renderer();
        this.state = new State();
    }
}