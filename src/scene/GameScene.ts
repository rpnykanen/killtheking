import Board from "@board/Board";
import Scene from "./Scene";
import EventManager from "@event/EventManager";
import RoundSkipEvent from "@event/events/RoundSkipEvent";
import Control from "../control/Control";
import GameOverEvent from "@event/events/GameOverEvent";
import Renderer from "@renderer/Renderer";
import State from "../State";
import Api from "../api/Api";

export default class GameScene implements Scene {

  constructor(
    private eventManager: EventManager,
    private board: Board,
    private controller: Control,
    private state: State,
    private renderer: Renderer,
    private api: Api
  ){}

  init(): void {
    this.board.initialize();
    this.setControls();
    this.update();
    this.state.start();
    this.renderer.initialize();
  }

  destroy() : void {
    this.state.stop();
    this.eventManager.unsubscribe(RoundSkipEvent.EVENTNAME, this.board.afterRoundActions);
    this.eventManager.unsubscribe(GameOverEvent.EVENTNAME, this.endGame);
    // this.renderer.draw();
    // this.board.destroy();
  }

  update = () => {
    this.eventManager.subscribe(RoundSkipEvent.EVENTNAME, this.board.afterRoundActions);
    this.eventManager.subscribe(GameOverEvent.EVENTNAME, this.endGame);
  }

  // todo: Maybe not supposed to be here.
  private setControls = (): void => {
    this.controller.setupControls(
      this.board.movePlayer,
      this.board.shoot,
      this.board.afterRoundActions,
      () => {}
    );
  }

  private endGame = (gameOverEvent: GameOverEvent): void => {
    this.state.stop();
    // Jump to end game menu scene or something
    this.end(gameOverEvent.win);
  }

  private end = async (win: boolean) => {
    // POISTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    // console.log(`end score: ${this.state.score()}`);
    const winOrLose = win ? 'win' : 'lose';
    try {
      await this.api.highscore(this.state.score());
    }
    catch(err) {}
    confirm(`You ${winOrLose}!`)
    location.reload();
  }

}