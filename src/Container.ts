import _options from "./options";
import Autoplay from "./control/Autoplay";
import Board from "./board/Board";
import CharacterFactory from "./board/character/CharacterFactory"
import Control from "./control/Control";
import Controller from "./control/Controller";
import Effect from "./renderer/effect/Effect";
import EffectFactory from "@renderer/effect/effects/EffectFactory";
import EventManager from "@event/EventManager";
import Grid from "./board/Grid";
import GridToCanvasPositionMapper from "./renderer/PositionConverter";
import Renderer from "./renderer/Renderer";
import RendererGrid from "./renderer/grid/Grid"
import State from "./State";
import Timer from "./Timer";


export default class Container {
  private _board: Board;
  private _renderer: Renderer;
  private _state: State;
  private _controller: Control;
  private _eventManager: EventManager;
  private _timer: Timer;

  constructor() {
    const params = new URLSearchParams(window.location.search)

    const options = _options;

    if (params.has('infinite')) {
      options.difficulty[0].enemyAmount = 99999;
    }

    const effectFactory = new EffectFactory();
    this._eventManager = new EventManager();
    this._timer = new Timer(this._eventManager);

    this._renderer = new Renderer(
      new RendererGrid(options.gridOptions),
      new Effect(options.gridOptions, effectFactory),
      new GridToCanvasPositionMapper(options.gridOptions),
      this._eventManager
    );


    if (params.has('autoplay') && params.get('autoplay') === 'true') {
      this._controller = new Autoplay(this._eventManager);
    } else {
      this._controller = new Controller(options.controls);
    }

    this._board = new Board(
      new Grid(options.gridOptions),
      new CharacterFactory(),
      this._eventManager
    );
  }

  get eventManager(): EventManager {
    return this._eventManager;
  }

  get controller() : Control {
    return this._controller;
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

  get timer(): Timer {
    return this._timer;
  }
  
}