import Player from './character/Player.js';
import pubsub from './event/PubSub.js';
import GameUpdateEvent from './event/events/GameUpdateEvent.js';

import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
import State from "./State.js";

export default class Game {
    grid: Grid;
    renderer: Renderer;
    player: Player;
    state: State;

    constructor() {
        this.grid = new Grid();
        this.renderer = new Renderer();
        this.state = new State();
        this.listenEvents();
    }

    private listenEvents = () => {
        pubsub.subscribe(GameUpdateEvent.EVENTNAME, this.spawnEnemies);
    }
    
    spawnEnemies = () => {
        this.grid.spawnEnemy();
    }

    event = (keyName: string) => {
        this.grid.action(keyName)
        // pubsub.publish(KeyboardEvent.create(keyName));
    }

    startGame = () => {
        this.state.start();
    }

    endGame = () => {
        this.state.stop();
    }
    
}