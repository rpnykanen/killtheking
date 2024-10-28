import Autoplay from "./control/Autoplay";
import Board from "./board/Board";
import CanvasFactory from "@renderer/CanvasFactory";
import CharacterFactory from "./board/character/CharacterFactory"
import ConfigurationManager from "./ConfigurationManager";
import Controller from "./control/Controller";
import EffectCanvas from "./renderer/game/effect/EffectCanvas";
import EffectFactory from "@renderer/game/effect/effects/EffectFactory";
import EventManager from "@event/EventManager";
import GameRenderer from "@renderer/game/GameRenderer";
import GameScene from "./scene/GameScene";
import Grid from "./board/Grid";
import GridToCanvasPositionMapper from "./renderer/game/PositionConverter";
import MenuScene from "./scene/MenuScene";
import MenuRenderer from "@renderer/menu/MenuRenderer";
import RendererGrid from "./renderer/game/grid/Grid"
import SceneManager from "./scene/SceneManager";
import State from "./State";
import Api from "./api/Api";
import BackgroundCanvas from "@renderer/menu/BackgroundCanvas";
import BackgroundEffect from "@renderer/game/effect/effects/BackgroundEffect";
import Loop from "./Loop";

export default class Bootstrap {
  private _sceneManager: SceneManager;
  private _loop: Loop;

  constructor() {
    const configManager = new ConfigurationManager();
    const effectFactory = new EffectFactory();
    const eventManager = new EventManager();
    const state = new State(eventManager);
    const canvasFactory = new CanvasFactory(configManager);
    this._loop = new Loop(eventManager);

    const gameRenderer = new GameRenderer(
      canvasFactory,
      new RendererGrid(canvasFactory, configManager.getGridConfigurations()),
      new EffectCanvas(configManager.getGridConfigurations(), effectFactory, canvasFactory),
      new GridToCanvasPositionMapper(configManager.getGridConfigurations()),
      eventManager
    );

    const api = new Api(configManager.getHsConfigurations(), eventManager);
    const characterFactory = new CharacterFactory();

    const menuRenderer = new MenuRenderer(
      eventManager,
      canvasFactory,
      configManager.getGridConfigurations(),
      new BackgroundCanvas(
        configManager.getGridConfigurations(),
        canvasFactory,
        new BackgroundEffect(configManager.getGridConfigurations(), characterFactory)
      )
    );

    const controller = configManager.getMiscConfiguration('autoplay') ?
      new Autoplay(eventManager) :
      new Controller(configManager.getControlConfigurations());

     const board = new Board(
      new Grid(configManager.getGridConfigurations()),
      characterFactory,
      eventManager,
      configManager,
    );

    this._sceneManager = new SceneManager(
      eventManager,
      new GameScene(eventManager, board, controller, state, gameRenderer, api),
      new MenuScene(menuRenderer, api)
    );
  }
  get sceneManager() { return this._sceneManager; }
  get loop() { return this._loop; }
}