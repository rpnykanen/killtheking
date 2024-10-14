import EventManager from "@event/EventManager";
import GameScene from "./GameScene";
import MenuScene from "./MenuScene";
import Scene from "./Scene";
import SceneChangeEvent from "@event/events/SceneChangeEvent";

export default class SceneManager {

  private currentScene: Scene;

  constructor(
    private eventManager: EventManager,
    private gameScene: GameScene, 
    private menuScene: MenuScene
  ) {
    // this.currentScene = this.gameScene;
    this.currentScene = this.menuScene;
    this.eventManager.subscribe(SceneChangeEvent.EVENT_NAME, this.changeScene);
  }

  public initialize = () => {
    this.currentScene.initialize();
  }

  public changeScene = () => {
    this.currentScene.destroy();
    this.currentScene = this.currentScene === this.gameScene ? this.menuScene : this.gameScene;
    this.currentScene.initialize();
  }

  public updateScene = () => {
    this.currentScene.update();
  }

  public endScene = () => {
    this.currentScene.destroy();
  }
  
}