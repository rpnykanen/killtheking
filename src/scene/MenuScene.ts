import Renderer from "@renderer/Renderer";
import Scene from "./Scene";
import Api from "../api/Api";
import EventManager from "@event/EventManager";

export default class MenuScene extends Scene {
  constructor(
    private menuRenderer: Renderer,
    private api: Api
  ){
    super();
  }

  initialize = (): void => {
    this.menuRenderer.initialize();
    // this.api.getHighscore();
  }

  update = (): void => {
    this.menuRenderer.update();
  }
  
  destroy = (): void => {
    this.menuRenderer.destroy();
  }
}