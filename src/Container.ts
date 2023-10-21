import State from "./State.js";
import CharacterFactory from "./character/CharacterFactory.js"
import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";

export default class Container {
  private _characterFactory: CharacterFactory
  private _grid: Grid;
  private _renderer: Renderer;
  private _state: State;

  constructor(){
    this._characterFactory = new CharacterFactory();
    this._grid = new Grid(this._characterFactory);
    this._renderer = new Renderer();
    this._state = new State();
  }

  get characterFactory(): CharacterFactory {
    return this.characterFactory;
  }
  
  get grid(): Grid{
    return this._grid;
  }

  get renderer(): Renderer{
    return this._renderer;
  }

  get state(): State{
    return this._state;
  }

}