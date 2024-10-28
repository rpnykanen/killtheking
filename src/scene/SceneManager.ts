import EventManager from "@event/EventManager";
import GameScene from "./GameScene";
import MenuScene from "./MenuScene";
import Scene from "./Scene";
import SceneChangeEvent from "@event/events/SceneChangeEvent";
import LoopEvent from "@event/events/LoopEvent";

export default class SceneManager {
  private currentScene: Scene;

  constructor(
    private eventManager: EventManager,
    private gameScene: GameScene, 
    private menuScene: MenuScene
  ) {
    this.currentScene = this.menuScene;
    this.eventManager.subscribe(SceneChangeEvent.EVENT_NAME, this.changeScene);
    this.eventManager.subscribe(LoopEvent.EVENT_NAME, this.updateScene);
  }

  public initialize = () => {
    this.currentScene.initialize();
  }

  public changeScene = () => {
    this.currentScene.destroy();
    this.currentScene = this.currentScene === this.gameScene ? this.menuScene : this.gameScene;
    this.currentScene.initialize();
  }

  // TODO maybe loop here.
  public updateScene = () => {
    this.currentScene.update();
  }

  public endScene = () => {
    this.currentScene.destroy();
  }

}