import Board from "./board/Board";
import GridToCanvasPositionMapper from "./renderer/GridToCanvasPositionMapper";
import CharacterFactory from "./board/character/CharacterFactory"
import Controller from "./Controller";
import Effect from "./renderer/effect/Effect";
import Game from "./Game";
import Grid from "./board/Grid";
import Renderer from "./renderer/Renderer";
import RendererGrid from "./renderer/grid/Grid"
import State from "./State";
import _options from "./options";
import EffectFactory from "@renderer/effect/effects/EffectFactory";


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