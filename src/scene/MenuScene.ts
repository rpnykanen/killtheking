import Renderer from "@renderer/Renderer";
import Scene from "./Scene";
import EventManager from "@event/EventManager";
import State from "../State";

export default class MenuScene implements Scene {

  constructor(
    private eventManager: EventManager,
    private menuRenderer: Renderer,
    private state: State,
  ){
    // eventManager.subscribe();
  }

  destroy(): void {
    this.state.stop();
    // this.eventManager.unsubscribe();
  }

  init(): void {
    this.menuRenderer.initialize();
    this.state.start();
  }

  update(): void {
    throw new Error("Method not implemented.");
  }

}