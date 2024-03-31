import EventManager from "@event/EventManager";
import GameUpdateEvent from "@event/events/GameUpdateEvent";
import RoundSkipEvent from "@event/events/RoundSkipEvent";

export default class Timer {

  private loopId: number;
  private isActive = false;
  private startTime: number;
  private currentRoundLength = 0;
  private roundLength = 500;

  constructor(private eventManager: EventManager) {
    this.eventManager.subscribe(GameUpdateEvent.EVENTNAME, this.resetCounter);
  }

  public start = (): void => {
    this.isActive = true;
    if (!this.loopId) {
      this.startTime = Date.now();
      this.loopId = requestAnimationFrame(this.loop);
    }
  }

  public stop = (): void => {
    this.isActive = false;
    this.loopId = 0;
  }

  private resetCounter = () => {
    this.currentRoundLength = 0;
  }

  private loop = (t: number) => {
    if (!this.isActive) return;

    if (this.currentRoundLength >= this.roundLength) {
      this.currentRoundLength = 0;
      this.eventManager.publish(new RoundSkipEvent());
    } else {
      this.currentRoundLength += 5;
    }
    requestAnimationFrame(this.loop)
  }

}