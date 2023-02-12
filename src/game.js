import Renderer from './renderer/renderer.js';
import Player from './player/player.js';
import Grid from './grid/grid.js';
import Manager from './GameManager/manager.js';

export default class Game {

    constructor(context) {
        this.player = new Player();
        this.grid = new Grid(40, 40);
        this.player = new Player();
        this.context = context;
        this.manager = new Manager(this.grid, []);
        this.renderer = new Renderer(context, this.grid,  this.manager, this.player);
        this.initialize();
    }

    initialize = () => {
        this.renderer.drawGrid();
        // this.renderer.renderCharacters([this.player]);
        // this.renderer.renderCharacters(this.manager.getEnemies());

        this.manager.update();
        this.renderer.update();
        
    }

    update = () => {
        this.manager.update();
        this.renderer.update();
    }

}