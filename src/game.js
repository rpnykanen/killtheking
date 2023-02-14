import Renderer from './renderer/renderer.js';
import Player from './character/player.js';
import Grid from './grid/grid.js';
import Manager from './grid/manager.js';

export default class Game {

    constructor() {
        this.grid = new Grid(
            new Player(),
            new Manager(),
            new Renderer()
        );
        this.grid.initialize();
    }

    event = (keyCode) => {
        const action = Manager.events[keyCode];
        if (action === undefined) return;
        this.grid.action(action);
    }

}