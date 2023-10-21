import State from "./State.js";
import CharacterFactory from "./character/CharacterFactory.js";
import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
export default class Container {
    constructor() {
        this._characterFactory = new CharacterFactory();
        this._grid = new Grid(this._characterFactory);
        this._renderer = new Renderer();
        this._state = new State();
    }
    get characterFactory() {
        return this.characterFactory;
    }
    get grid() {
        return this._grid;
    }
    get renderer() {
        return this._renderer;
    }
    get state() {
        return this._state;
    }
}
