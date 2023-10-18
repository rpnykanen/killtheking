import EnemyDeathEvent from "./event/events/EnemyDeathEvent.js";
import GameUpdateEvent from "./event/events/GameUpdateEvent.js";
import pubsub from "./event/PubSub.js";
import GameActionEvent from "./event/events/GameActionEvent.js";

export default class State {

  private roundLength: number;
  private roundCurrentLength: number;
  private gameActive: boolean;
  private requestId: any;
  private startTime: number;
  private endTime: number;
  private kills = 0;
  private actions = 0;

  constructor() {
    pubsub.subscribe(GameUpdateEvent.EVENTNAME, this.resetCounter);
    pubsub.subscribe(EnemyDeathEvent.EVENTNAME, this.addKills);
    pubsub.subscribe(GameActionEvent.EVENTNAME, this.action);
    this.roundLength = 500;
    this.roundCurrentLength = 0;
    this.gameActive = false;
    this.start();
    this.requestId = undefined;
  }

  action = (gameActionEvent: GameActionEvent) => {
    this.actions += 1;
    this.roundCurrentLength = 0;
    const actionMillisecond = (((gameActionEvent.currentTime - this.startTime) / this.actions) / 1000);
  }

  start = () => {
    this.gameActive = true;
    if (!this.requestId) {
      this.requestId = requestAnimationFrame(this.loop);
    }
    this.startTime = Date.now();
  }

  end = () => {
    this.gameActive = false;
    cancelAnimationFrame(this.requestId);
    this.requestId = undefined;
    this.endTime = Date.now();
    const score = (((this.endTime - this.startTime) / this.actions));
    alert(`Game ended. score: ${score}`);
  }

  resetCounter = () => {
    this.roundCurrentLength = 0;
  }

  addKills = () => {
    this.kills += 1;
  }

  getKills = () => {
    return this.kills;
  }

  isActive = () => {
    return this.gameActive;
  }

  private loop = (): void => {
    if (!this.gameActive) return;
    /*
    if (this.roundCurrentLength >= this.roundLength) {
        this.roundCurrentLength = 0;
        pubsub.publish(RoundSkipEvent.create());
    }
    
    this.roundCurrentLength += 5;
    */
    requestAnimationFrame(this.loop);
  }
}
