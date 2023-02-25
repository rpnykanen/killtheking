import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
export default class Game {
    constructor() {
        this.event = (keyCode) => {
        };
        this.grid = new Grid();
        this.renderer = new Renderer();
    }
}
Game.events = { '37': 'left', '38': 'shoot', '39': 'right', '40': 'skip' };
