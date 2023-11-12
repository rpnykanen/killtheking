import Controller from "./Controller.js";
import State from "./State.js";
import CharacterFactory from "./character/CharacterFactory.js";
import GameGrid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
import _options from "./options.js";
import RendererGrid from "./renderer/grid/Grid.js";
import Effect from "./renderer/effect/Effect.js";
import CanvasPositionMapper from "./renderer/CanvasPositionMapper.js";
export default class Container {
    constructor() {
        const options = _options;
        this._controller = new Controller(options.controls);
        const rendererGrid = new RendererGrid(options.gridOptions);
        const effect = new Effect(options.gridOptions);
        const canvasPositionMapper = new CanvasPositionMapper(options.gridOptions);
        this._renderer = new Renderer(rendererGrid, effect, canvasPositionMapper);
        this._characterFactory = new CharacterFactory();
        this._state = new State();
        this._grid = new GameGrid(this._controller, this._characterFactory, options.gridOptions);
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
