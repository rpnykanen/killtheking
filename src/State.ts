import EnemyDeathEvent from "./event/events/EnemyDeathEvent";
import GameUpdateEvent from "./event/events/GameUpdateEvent";
import GameActionEvent from "./event/events/GameActionEvent";
import RoundSkipEvent from "./event/events/RoundSkipEvent";
import EventManager from "@event/EventManager";
import NewGameEvent from "@event/events/NewGameEvent";

export default class State {

  private roundLength: number;
  private roundCurrentLength: number;
  private gameActive: boolean;
  private requestId: number;
  private startTime: number;
  private endTime: number;
  private kills = 0;
  private actions = 0;
  private _boss = false;

  constructor(private eventManager: EventManager) {
    this.eventManager.subscribe(GameUpdateEvent.EVENTNAME, this.resetCounter);
    // this.eventManager.subscribe(EnemyDeathEvent, this.addKills);
    // this.eventManager.subscribe(GameActionEvent, this.action);
  }

  public initialize = () => {
    this.roundLength = 1000;
    this.roundCurrentLength = 0;
    this.gameActive = false;
    this.start();
    this.requestId = 0;
  }

  public action = (gameActionEvent: GameActionEvent) => {
    this.actions += 1;
    this.roundCurrentLength = 0;
    // const actionMillisecond = (((gameActionEvent.currentTime - this.startTime) / this.actions) / 1000);
  }

  public start = () : void => {
    this.gameActive = true;
    if (!this.requestId) {
      this.requestId = requestAnimationFrame(this.loop);
    }
    this.startTime = Date.now();
  }

  public end = (win: boolean) : void => {
    this.gameActive = false;
    cancelAnimationFrame(this.requestId);
    this.requestId = 0;
    this.endTime = Date.now();
    // const score = (((this.endTime - this.startTime) / this.actions));

    const winOrLose = win ? 'win' : 'lose';

    confirm(`You ${winOrLose}!`)
    location.reload();
  }

  public resetCounter = (): void => {
    this.roundCurrentLength = 0;
  }

  public addKills = () : void => {
    this.kills += 1;
  }

  public getKills = (): number => {
    return this.kills;
  }

  public isActive = (): boolean => {
    return this.gameActive;
  }

  private loop = (): void => {
    if (!this.gameActive) return;

    if (this.roundCurrentLength >= this.roundLength) {
      this.roundCurrentLength = 0;
      this.eventManager.publish(new RoundSkipEvent());
    }
    
    this.roundCurrentLength += 5;
    requestAnimationFrame(this.loop);
  }
}
