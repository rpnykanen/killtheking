import Controller from "./Controller.js";
import State from "./State.js";
import CharacterFactory from "./character/CharacterFactory.js";
import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
export default class Container {
    constructor() {
        this._controller = new Controller();
        this._renderer = new Renderer();
        this._characterFactory = new CharacterFactory();
        this._state = new State();
        this._grid = new Grid(this._controller, this._characterFactory);
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
