import Player from './character/Player.js';
import GameRestartEvent from './event/events/GameRestartEvent.js';
import GameUpdateEvent from './event/events/GameUpdateEvent.js';
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
        pubsub.subscribe(GameRestartEvent.EVENTNAME, this.restart);
        this.renderer = new Renderer();
        this.grid = new Grid();
        this.state = new State();
        this.boss = false;
    }

    action = (keyName: string) => {
        this.grid.action(keyName)
        this.test();
    }

    startGame = () => {
        this.state.start();
    }

    endGame = () => {
        this.state.end();
    }

    test = () => {
        if (this.state.getKills() === 10 && this.boss === false) {
            this.grid.spawnBoss();
            this.boss = true;
        }
    }

    restart = () => {
        this.grid = new Grid();
        this.renderer = new Renderer();
        this.state = new State();
    }
    
}