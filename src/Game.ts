import Bootstrap from './Bootstrap';
import Renderer from "./renderer/game/GameRenderer";
import SceneManager from './scene/SceneManager';

export default class Game {

  private bootstrap: Bootstrap;
  private sceneManager: SceneManager;

  constructor() {
    this.bootstrap = new Bootstrap();
    this.sceneManager = this.bootstrap.sceneManager;
  }

  public initialize = (): void => {
    this.sceneManager.initialize();
  }
  
}