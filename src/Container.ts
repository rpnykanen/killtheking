import Controller from "./Controller.js";
import Game from "./Game.js";
import State from "./State.js";
import CharacterFactory from "./character/CharacterFactory.js"
import GameGrid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
import _options from "./options.js";
import RendererGrid from "./renderer/grid/Grid.js"
import Effect from "./renderer/effect/Effect.js";
import CanvasPositionMapper from "./renderer/CanvasPositionMapper.js";

export default class Container {
  private _characterFactory: CharacterFactory
  private _grid: GameGrid;
  private _renderer: Renderer;
  private _state: State;
  private _controller: Controller;
  private _game: Game;

  constructor(){
    const options = _options;
    this._controller = new Controller(options.controls);
    
    const rendererGrid = new RendererGrid(options.gridOptions);
    const effect = new Effect(options.gridOptions);
    const canvasPositionMapper = new CanvasPositionMapper(options.gridOptions);
    this._renderer = new Renderer(rendererGrid, effect, canvasPositionMapper);

    this._characterFactory = new CharacterFactory();

    this._state = new State();
   
    this._grid = new GameGrid(
      this._controller, 
      this._characterFactory,
      options.gridOptions
    );
  }

  get characterFactory(): CharacterFactory {
    return this.characterFactory;
  }
  
  get grid(): GameGrid {
    return this._grid;
  }

  get renderer(): Renderer {
    return this._renderer;
  }

  get state(): State {
    return this._state;
  }

  get game(): Game {
    return this._game;
  }

}