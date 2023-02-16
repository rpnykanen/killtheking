import Renderer from './renderer/renderer.js';
import Player from './character/player.js';
import Grid from './grid/grid.js';

export default class Game {

    static events = {'37': 'left', '38': 'up', '39': 'right', '40': 'down'};

    constructor() {
        this.grid = new Grid(
            new Player(),
            new Renderer()
        );
        this.grid.initialize();
    }

    event = (keyCode) => {
        const action = Game.events[keyCode];
        if (action === undefined) return;
        this.grid.action(action);
    }

}