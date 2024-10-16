import EventManager from "@event/EventManager";
import EnemyDeathEvent from "@event/events/EnemyDeathEvent";
import GameUpdateEvent from "@event/events/GameUpdateEvent";
import RoundSkipEvent from "@event/events/RoundSkipEvent";

export default class State {
  private loopId: number;
  private isActive = false;
  private roundLength = 500;
  private currentRoundLength = 0;
  private kills = 0;
  private _score = 0;

  constructor(private eventManager: EventManager) {}

  start = (): void => {
    this.eventManager.subscribe(GameUpdateEvent.EVENTNAME, this.resetCounter);
    this.eventManager.subscribe(EnemyDeathEvent.EVENTNAME, this.addScore);

    this.isActive = true;
    if (!this.loopId) {
      this.loopId = requestAnimationFrame(this.loop);
    }
  }

  stop = (): void => {
    this.eventManager.unsubscribe(GameUpdateEvent.EVENTNAME, this.resetCounter);
    this.eventManager.unsubscribe(EnemyDeathEvent.EVENTNAME, this.addScore);

    this.isActive = false;
    this.loopId = 0;
  }

  reset = (): void => {
    this._score = 0;
    this.kills = 0;
    this.currentRoundLength = 0;
  }

  addScore = (event: EnemyDeathEvent): void => {
    const enemy = event.enemy;
    this._score += (enemy.score * 8)
  }

  private resetCounter = () => {
    this.currentRoundLength = 0;
  }

  score = (): number => {
    return this._score;
  }

  private loop = () => {
    if (!this.isActive) return;

    if (this.currentRoundLength >= this.roundLength) {
      this.currentRoundLength = 0;
      this.eventManager.publish(new RoundSkipEvent());
    } else {
      this.currentRoundLength += 5;
    }
    requestAnimationFrame(this.loop);
  }

}