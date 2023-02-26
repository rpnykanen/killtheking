/*
import Renderer from './renderer/renderer.js';
import Player from './character/player.js';
import Grid from './grid/grid.js';
*/
import Player from './character/Player.js';
import pubsub from './event/PubSub.js';
import GameUpdateEvent from './event/events/GameUpdateEvent';
import KeyboardEvent from './event/events/KeyboardEvent.js';


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
        //this.grid.initialize();
    }
    
    event = (keyName: string) => {
        pubsub.publish(KeyboardEvent.eventName, keyName);
    }
    
}