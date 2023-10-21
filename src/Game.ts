import GameActionEvent from './event/events/GameActionEvent.js';
import GameOverEvent from './event/events/GameOverEvent.js';
import pubsub from './event/PubSub.js';
import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
import State from "./State.js";

export default class Game {

  constructor(
    private grid: Grid, 
    private renderer: Renderer, 
    private state: State
  ) {
    pubsub.subscribe(GameOverEvent.EVENTNAME, this.endGame);
  }

  handleAction = (keyName: string) => {
    if (!this.state.isActive()) {
      return;
    }

    this.grid.action(keyName)
    if (this.state.getKills() === 10 && this.state.boss === false) {
      this.grid.spawnBoss();
      this.state.boss = true;
    }
    pubsub.publish(new GameActionEvent());
  }

  startGame = () => {
    this.state.start();
  }

  endGame = () => {
    this.state.end();
    this.grid.end();
  }

}