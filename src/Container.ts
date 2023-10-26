import Controller from "./Controller.js";
import Game from "./Game.js";
import State from "./State.js";
import CharacterFactory from "./character/CharacterFactory.js"
import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";

export default class Container {
  private _characterFactory: CharacterFactory
  private _grid: Grid;
  private _renderer: Renderer;
  private _state: State;
  private _controller: Controller;
  private _game: Game;

  constructor(){
    this._controller = new Controller();
    this._renderer = new Renderer();
    this._characterFactory = new CharacterFactory();

    this._state = new State();
   
    this._grid = new Grid(
      this._controller, 
      this._characterFactory
    );
  }

  get characterFactory(): CharacterFactory {
    return this.characterFactory;
  }
  
  get grid(): Grid {
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