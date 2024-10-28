import EventManager from "@event/EventManager";
import LoopEvent from "@event/events/LoopEvent";

export default class Loop {
  private isActive = false;

  constructor(private eventManager: EventManager) {
  }

  initialize = () => {
    this.isActive = true;
    this.loop();
  }

  stop = () => {
    this.isActive = false;
  }

  private loop = () => {
    if (!this.isActive) { return; }
    this.eventManager.publish(new LoopEvent());
    requestAnimationFrame(this.loop)
  }
}