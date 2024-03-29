import Board from './board/Board';
import Container from './Container';
import GameOverEvent from './event/events/GameOverEvent';
import Renderer from "./renderer/Renderer";
import State from "./State";
import EventManager from '@event/EventManager';
import Controller from './control/Controller';
import NewGameEvent from '@event/events/NewGameEvent';
import RoundSkipEvent from '@event/events/RoundSkipEvent';

export default class Game {

  private board: Board;
  private renderer: Renderer;
  private state: State;
  private container: Container;
  private eventManager: EventManager;
  private controller: Controller;

  constructor() {
    this.container = new Container();
    this.controller = this.container.controller;
    this.eventManager = this.container.eventManager;

    this.state = this.container.state;
    this.renderer = this.container.renderer;
    this.board = this.container.board;

    this.controller.setupPlayerControls(
      this.board.movePlayer,
      this.board.shoot,
      this.board.afterRoundActions,
      this.restart
    );

    this.update();
  }

  update(): void {
    this.eventManager.subscribe(RoundSkipEvent.EVENTNAME, this.board.afterRoundActions);
    this.eventManager.subscribe(GameOverEvent.EVENTNAME, this.endGame);
  }

  public initialize = (): void => {
    this.state.initialize();
    this.renderer.initialize();
    this.board.initialize();
    this.state.start();
  }

  private endGame = (gameOverEvent: GameOverEvent): void => {
    this.state.end(gameOverEvent.win);
  }

  public restart = () => {
    location.reload();
  }
  
}