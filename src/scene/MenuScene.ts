import Renderer from "@renderer/Renderer";
import Scene from "./Scene";
import Api from "../api/Api";

export default class MenuScene implements Scene {

  constructor(
    private menuRenderer: Renderer,
    private api: Api
  ){
  }

  initialize(): void {
    this.menuRenderer.initialize();
    this.api.getHighscore();
  }

  update(): void {
    throw new Error("Method not implemented.");
  }
  
  destroy(): void {
    this.menuRenderer.destroy();
  }

}