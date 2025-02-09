import Board from "@board/Board";
import Scene from "./Scene";
import EventManager from "@event/EventManager";
import RoundSkipEvent from "@event/events/RoundSkipEvent";
import Control from "../control/Control";
import GameOverEvent from "@event/events/GameOverEvent";
import Renderer from "@renderer/Renderer";
import State from "../State";
import Api from "../api/Api";
import SceneChangeEvent from "@event/events/SceneChangeEvent";

export default class GameScene extends Scene {
  constructor(
    private eventManager: EventManager,
    private board: Board,
    private controller: Control,
    private state: State,
    private renderer: Renderer,
    private api: Api
  ){ super(); }

  initialize = (): void => {
    this.board.initialize();
    this.setControls();

    this.eventManager.subscribe(RoundSkipEvent.EVENTNAME, this.board.afterRoundActions);
    this.eventManager.subscribe(GameOverEvent.EVENTNAME, this.endGame);

    this.state.start();

    this.renderer.initialize();
  }

  update = (): void => {
    if (this.state.currentRoundLength >= this.state.roundLength) {
      this.state.currentRoundLength = 0;
      this.eventManager.publish(new RoundSkipEvent());
    } else {
      this.state.currentRoundLength += 5;
    }
  }

  destroy = () : void => {
    this.board.reset();
    this.state.reset();
    this.state.stop();
    this.renderer.destroy();
    this.eventManager.unsubscribe(RoundSkipEvent.EVENTNAME, this.board.afterRoundActions);
    this.eventManager.unsubscribe(GameOverEvent.EVENTNAME, this.endGame);
    // this.renderer.draw();
    // this.board.destroy();
  }

  private setControls = (): void => {
    this.controller.setupControls(
      this.board.movePlayer,
      this.board.shoot,
      this.board.afterRoundActions,
      () => { /* noop */ }
    );
  }

  private endGame = (gameOverEvent: GameOverEvent): void => {
    this.state.stop();
    this.end(gameOverEvent.win);
  }

  private end = async (win: boolean) => {
    const winOrLose = win ? 'win' : 'lose';
    try {
      await this.api.highscore(this.state.score());
    }
    catch(err) { /* noop */ }
    confirm(`You ${winOrLose}!`)
    this.state.reset();
    this.eventManager.publish(new SceneChangeEvent('menu'));
  }
}