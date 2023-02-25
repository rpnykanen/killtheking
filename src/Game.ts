/*
import Renderer from './renderer/renderer.js';
import Player from './character/player.js';
import Grid from './grid/grid.js';
import pubsub from './event/pubSub.js';
*/

import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";

export default class Game {

    static events = {'37': 'left', '38': 'shoot', '39': 'right', '40': 'skip'};

    grid: Grid;
    renderer: Renderer;

    //private Grid grid;

    constructor() {
        this.grid = new Grid();
        this.renderer = new Renderer();
        //this.grid.initialize();
    }
    
    event = (keyCode: string) => {
        /*
        switch(Game.events[keyCode]) {
            case 'left': 
            case 'right': 
            case 'shoot': 
            case 'skip': 
                pubsub.publish('keyboard.event', Game.events[keyCode]);
                break;
        }
        */
    }
    
}