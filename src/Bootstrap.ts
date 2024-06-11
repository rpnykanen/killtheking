import Autoplay from "./control/Autoplay";
import Board from "./board/Board";
import CharacterFactory from "./board/character/CharacterFactory"
import ConfigurationManager from "./ConfigurationManager";
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
import CanvasManager from "@renderer/CanvasManager";

export default class Bootstrap {
  private _board: Board;
  private _renderer: Renderer;
  private _state: State;
  private _controller: Control;
  private _eventManager: EventManager;
  private _timer: Timer;
  private _configurationManager: ConfigurationManager

  constructor() {
    this._configurationManager = new ConfigurationManager();
    const effectFactory = new EffectFactory();
    this._eventManager = new EventManager();
    this._timer = new Timer(this._eventManager);
    
    const cm = new CanvasManager(this._configurationManager);

    this._renderer = new Renderer(
      new RendererGrid(this._configurationManager.getGridConfigurations(), cm),
      new Effect(this._configurationManager.getGridConfigurations(), effectFactory, cm),
      new GridToCanvasPositionMapper(this._configurationManager.getGridConfigurations()),
      this._eventManager
    );

    this._controller = this._configurationManager.getMiscConfiguration('autoplay') ? 
      new Autoplay(this._eventManager) : 
      new Controller(this._configurationManager.getControlConfigurations());


    this._board = new Board(
      new Grid(this._configurationManager.getGridConfigurations()),
      new CharacterFactory(),
      this._eventManager,
      this._configurationManager,
    );
  }

  get configurationManager(): ConfigurationManager {
    return this._configurationManager;
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