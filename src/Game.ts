import Bootstrap from './Bootstrap';
import SceneManager from './scene/SceneManager';
import Loop from "./Loop";

export default class Game {
  private bootstrap: Bootstrap;
  private sceneManager: SceneManager;
  private loop: Loop;

  constructor() {
    this.bootstrap = new Bootstrap();
    this.sceneManager = this.bootstrap.sceneManager;
    this.loop = this.bootstrap.loop;
  }

  public initialize = (): void => {
    this.loop.initialize();
    this.sceneManager.initialize();
  }
}