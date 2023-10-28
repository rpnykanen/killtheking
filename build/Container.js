import Controller from "./Controller.js";
import State from "./State.js";
import CharacterFactory from "./character/CharacterFactory.js";
import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
import _options from "./options.js";
export default class Container {
    constructor() {
        const options = _options;
        this._controller = new Controller(options.controls);
        this._renderer = new Renderer();
        this._characterFactory = new CharacterFactory();
        this._state = new State();
        this._grid = new Grid(this._controller, this._characterFactory, options.gridOptions);
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
    get game() {
        return this._game;
    }
}
