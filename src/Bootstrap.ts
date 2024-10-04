import Autoplay from "./control/Autoplay";
import Board from "./board/Board";
import CanvasFactory from "@renderer/CanvasFactory";
import CharacterFactory from "./board/character/CharacterFactory"
import ConfigurationManager from "./ConfigurationManager";
import Control from "./control/Control";
import Controller from "./control/Controller";
import Effect from "./renderer/game/effect/Effect";
import EffectFactory from "@renderer/game/effect/effects/EffectFactory";
import EventManager from "@event/EventManager";
import GameRenderer from "@renderer/game/GameRenderer";
import GameScene from "./scene/GameScene";
import Grid from "./board/Grid";
import GridToCanvasPositionMapper from "./renderer/game/PositionConverter";
import MenuScene from "./scene/MenuScene";
import MenuRenderer from "@renderer/menu/MenuRenderer";
import Renderer from "./renderer/Renderer";
import RendererGrid from "./renderer/game/grid/Grid"
import SceneManager from "./scene/SceneManager";
import State from "./State";
import Api from "./api/Api";

export default class Bootstrap {
  private _board: Board;
  private _gameRenderer: Renderer;
  private _menuRenderer: Renderer;
  private _state: State;
  private _controller: Control;
  private _eventManager: EventManager;
  private _configurationManager: ConfigurationManager
  private _sceneManager: SceneManager;

  constructor() {
    this._configurationManager = new ConfigurationManager();
    const effectFactory = new EffectFactory();
    this._eventManager = new EventManager();
    this._state = new State(this._eventManager);
    const api = new Api();
    const canvasFactory = new CanvasFactory(this._configurationManager);

    this._gameRenderer = new GameRenderer(
      canvasFactory,
      new RendererGrid(canvasFactory, this._configurationManager.getGridConfigurations()),
      new Effect(this._configurationManager.getGridConfigurations(), effectFactory, canvasFactory),
      new GridToCanvasPositionMapper(this._configurationManager.getGridConfigurations()),
      this._eventManager
    );

    this._menuRenderer = new MenuRenderer(
      this._eventManager,
      canvasFactory,
      this._configurationManager.getGridConfigurations(),
      api
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

    this._sceneManager = new SceneManager(
      this._eventManager,
      new GameScene(this._eventManager, this._board, this._controller, this._state, this._gameRenderer, api),
      new MenuScene(this._eventManager, this._menuRenderer, this._state)
    );
  }

  get board(): Board { return this._board; }

  get configurationManager(): ConfigurationManager { return this._configurationManager; }

  get controller() : Control { return this._controller; }

  get eventManager(): EventManager { return this._eventManager; }

  get sceneManager(): SceneManager { return this._sceneManager }
  
  get state(): State { return this._state; }
  
}