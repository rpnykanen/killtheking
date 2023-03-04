/*
import Renderer from './renderer/renderer.js';
import Player from './character/player.js';
import Grid from './grid/grid.js';
*/
import Player from './character/Player.js';
import pubsub from './event/PubSub.js';
import GameUpdateEvent from './event/events/GameUpdateEvent.js';
import KeyboardEvent from './event/events/KeyboardEvent.js';
import PlayerMoveEvent from './event/events/PlayerMoveEvent.js';


import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";

export default class Game {

    grid: Grid;
    renderer: Renderer;
    player: Player;

    //private Grid grid;

    constructor() {
        this.grid = new Grid();
        this.renderer = new Renderer();
        this.player = new Player();
        this.grid.updateGrid();
        pubsub.subscribe(GameUpdateEvent.eventName, this.spawnEnemies);
        // pubsub.subscribe(PlayerMoveEvent.eventName, PlayerMoveEvent.create(this._oldPosition, this._position));
    }
    
    spawnEnemies = () => {
        this.grid.spawnEnemies();
    }
    
    event = (keyName: string) => {
        pubsub.publish(KeyboardEvent.eventName, keyName);
    }
    
}