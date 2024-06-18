import Board from "@board/Board";
import Scene from "./Scene";
import EventManager from "@event/EventManager";
import RoundSkipEvent from "@event/events/RoundSkipEvent";
import Control from "../control/Control";
import Timer from "../Timer";
import GameOverEvent from "@event/events/GameOverEvent";

export default class GameScene implements Scene {

  constructor(private eventManager: EventManager, private board: Board, private controller: Control, private timer: Timer){}

  init(): void {
    this.board.initialize();
    this.eventManager.subscribe(RoundSkipEvent.EVENTNAME, this.board.afterRoundActions);
    this.eventManager.subscribe(GameOverEvent.EVENTNAME, this.endGame);
    this.setControls();
  }

  // todo: not supposed to be here.
  private setControls = (): void => {
    this.controller.setupControls(
      this.board.movePlayer,
      this.board.shoot,
      this.board.afterRoundActions,
      () => {}
    );
  }

  update(): void {
    throw new Error("Method not implemented.");
  }
  draw(): void {
    throw new Error("Method not implemented.");
  }
  destroy(): void {
    this.timer.stop();
    // this.board.destroy();
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