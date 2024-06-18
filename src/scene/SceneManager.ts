import GameScene from "./GameScene";
import MenuScene from "./MenuScene";
import Scene from "./Scene";

export default class SceneManager {

  private currentScene: Scene;

  constructor(private gameScene: GameScene, private menuScene: MenuScene) {
    this.currentScene = this.gameScene;
  }

  public initialize = () => {
    this.currentScene.init();
  }

  public changeScene = () => {
    this.currentScene.destroy();
    this.currentScene = this.currentScene === this.gameScene ? this.menuScene : this.currentScene;
    this.currentScene.init();
  }

  public updateScene = () => {
    this.currentScene.update();
  }

  public endScene = () => {
    this.currentScene.destroy();
  }
  
}