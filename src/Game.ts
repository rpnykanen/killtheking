import Board from './board/Board';
import Bootstrap from './Bootstrap';
import EventManager from '@event/EventManager';
import GameOverEvent from './event/events/GameOverEvent';
import Renderer from "./renderer/Renderer";
import RoundSkipEvent from '@event/events/RoundSkipEvent';
import Timer from './Timer';
import Control from './control/Control';

export default class Game {

  private board: Board;
  private renderer: Renderer;
  private bootstrap: Bootstrap;
  private eventManager: EventManager;
  private controller: Control;
  private timer: Timer;

  constructor() {
    this.bootstrap = new Bootstrap();
    this.controller = this.bootstrap.controller;
    this.eventManager = this.bootstrap.eventManager;

    this.renderer = this.bootstrap.renderer;
    this.board = this.bootstrap.board;
    this.timer = this.bootstrap.timer;

    this.setControls();
    this.update();
  }

  public initialize = (): void => {
    this.renderer.initialize();
    this.board.initialize();
    this.timer.start();
  }

  public restart = () => {
    location.reload();
  }

  private setControls = (): void => {
    this.controller.setupControls(
      this.board.movePlayer,
      this.board.shoot,
      this.board.afterRoundActions,
      this.restart
    );
  }

  private update(): void {
    this.eventManager.subscribe(RoundSkipEvent.EVENTNAME, this.board.afterRoundActions);
    this.eventManager.subscribe(GameOverEvent.EVENTNAME, this.endGame);
  }

  private endGame = (gameOverEvent: GameOverEvent): void => {
    this.timer.stop();
    this.end(gameOverEvent.win);
  }

  private end = (win: boolean) : void => {
    const winOrLose = win ? 'win' : 'lose';
    confirm(`You ${winOrLose}!`)
    location.reload();
  }
  
}