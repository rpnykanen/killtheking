import Board from './board/Board';
import Container from './Container';
import GameOverEvent from './event/events/GameOverEvent';
import Pubsub from './event/PubSub';
import Renderer from "./renderer/Renderer";
import State from "./State";

export default class Game {

  private board: Board;
  private renderer: Renderer;
  private state: State;
  private container: Container;

  constructor() {
    this.container = new Container();
    this.state = this.container.state;
    this.renderer = this.container.renderer;
    this.board = this.container.board;
    Pubsub.subscribe(GameOverEvent.EVENTNAME, this.endGame);
  }

  public initialize = (): void => {
    this.state.initialize();
    this.renderer.initialize();
    this.board.initialize();
  }

  public endGame = (): void => {
    this.state.end();
    this.board.end();
  }
  
}