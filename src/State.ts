import EventManager from "@event/EventManager";
import EnemyDeathEvent from "@event/events/EnemyDeathEvent";
import GameRoundEvent from "@event/events/GameRoundEvent";

export default class State {
  private _score = 0;
  public roundLength = 500;
  public currentRoundLength = 0;

  constructor(private eventManager: EventManager) {}

  start = (): void => {
    this.eventManager.subscribe(GameRoundEvent.EVENTNAME, this.resetCounter);
    this.eventManager.subscribe(EnemyDeathEvent.EVENTNAME, this.addScore);
  }

  stop = (): void => {
    this.eventManager.unsubscribe(GameRoundEvent.EVENTNAME, this.resetCounter);
    this.eventManager.unsubscribe(EnemyDeathEvent.EVENTNAME, this.addScore);
  }

  reset = (): void => {
    this._score = 0;
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
}