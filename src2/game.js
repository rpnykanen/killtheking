import Renderer from './renderer/renderer.js';
import Player from './character/player.js';
import Grid from './grid/grid.js';
import pubsub from './event/pubSub.js';
import Particles from './particles/particles.js';

export default class Game {

    static events = {'37': 'left', '38': 'shoot', '39': 'right', '40': 'skip'};

    constructor() {
        this.grid = new Grid(
            new Player(),
            new Renderer()
        );
        this.particles = new Particles();
        this.grid.initialize();
    }
    
    event = (keyCode) => {
        switch(Game.events[keyCode]) {
            case 'left': 
            case 'right': 
            case 'shoot': 
            case 'skip': 
                pubsub.publish('keyboard.event', Game.events[keyCode]);
                break;
        }
    }
    
}