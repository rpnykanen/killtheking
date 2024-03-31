import Board from './board/Board';
import Container from './Container';
import Controller from './control/Controller';
import EventManager from '@event/EventManager';
import GameOverEvent from './event/events/GameOverEvent';
import Renderer from "./renderer/Renderer";
import RoundSkipEvent from '@event/events/RoundSkipEvent';
import State from "./State";
import Timer from './Timer';

export default class Game {

  private board: Board;
  private renderer: Renderer;
  private state: State;
  private container: Container;
  private eventManager: EventManager;
  private controller: Controller;
  private timer: Timer;

  constructor() {
    this.container = new Container();
    this.controller = this.container.controller;
    this.eventManager = this.container.eventManager;

    this.state = this.container.state;
    this.renderer = this.container.renderer;
    this.board = this.container.board;
    this.timer = this.container.timer;

    this.controller.setupPlayerControls(
      this.board.movePlayer,
      this.board.shoot,
      this.board.afterRoundActions,
      this.restart
    );

    this.update();
  }

  private update(): void {
    this.eventManager.subscribe(RoundSkipEvent.EVENTNAME, this.board.afterRoundActions);
    this.eventManager.subscribe(GameOverEvent.EVENTNAME, this.endGame);
  }

  public initialize = (): void => {
    this.renderer.initialize();
    this.board.initialize();
    this.timer.start();
  }

  private endGame = (gameOverEvent: GameOverEvent): void => {
    this.timer.stop();
    this.state.end(gameOverEvent.win);
  }

  public restart = () => {
    location.reload();
  }
  
}