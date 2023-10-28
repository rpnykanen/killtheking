import Container from './Container.js';
import GameOverEvent from './event/events/GameOverEvent.js';
import pubsub from './event/PubSub.js';
import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
import State from "./State.js";

export default class Game {

  private grid: Grid;
  private renderer: Renderer;
  private state: State;
  private container: Container;

  constructor() {
    this.container = new Container();
    this.state = this.container.state;
    this.renderer = this.container.renderer;
    this.grid = this.container.grid;
    pubsub.subscribe(GameOverEvent.EVENTNAME, this.endGame);
  }

  public initialize = (): void => {
    this.state.initialize();
    this.renderer.initialize();
    this.grid.initialize();
  }

  public startGame = (): void => {
    this.state.start();
  }

  public endGame = (): void => {
    this.state.end();
    this.grid.end();
  }
  
}