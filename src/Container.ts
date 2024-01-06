import Board from "./board/Board.js";
import GridToCanvasPositionMapper from "./renderer/GridToCanvasPositionMapper.js";
import CharacterFactory from "./board/character/CharacterFactory.js"
import Controller from "./Controller.js";
import Effect from "./renderer/effect/Effect.js";
import Game from "./Game.js";
import Grid from "./board/Grid.js";
import Renderer from "./renderer/Renderer.js";
import RendererGrid from "./renderer/grid/Grid.js"
import State from "./State.js";
import _options from "./options.js";
import EffectFactory from "@renderer/effect/effects/EffectFactory.js";


export default class Container {
  private _characterFactory: CharacterFactory
  private _board: Board;
  private _renderer: Renderer;
  private _state: State;
  private _controller: Controller;
  private _game: Game;

  constructor(){
    const options = _options;
    this._controller = new Controller(options.controls);
    const effectFactory = new EffectFactory();
    
    const rendererGrid = new RendererGrid(options.gridOptions);
    const effect = new Effect(options.gridOptions, effectFactory);
    const PositionMapper = new GridToCanvasPositionMapper(options.gridOptions);
    this._renderer = new Renderer(rendererGrid, effect, PositionMapper);

    this._characterFactory = new CharacterFactory();

    this._state = new State();
   
    this._board = new Board(
      new Grid(options.gridOptions),
      this._controller, 
      this._characterFactory,
    );
  }

  get characterFactory(): CharacterFactory {
    return this.characterFactory;
  }
  
  get board(): Board {
    return this._board;
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