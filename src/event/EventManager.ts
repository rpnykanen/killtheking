import IEvent from "./events/IEvent";

type Events = {
  [index: string]: CallableFunction[];
}

export default class EventManager {

  private _events: Events = {};

  public subscribe = (eventname: string, callback: CallableFunction): void => {
    this.events[eventname] = this.events[eventname] || [];
    this.events[eventname].push(callback);
  }

  public unsubscribe = (eventname: string, callback: CallableFunction): void => {
    if (this.events[eventname]) {
      console.log(this.events[eventname]);
      this.events[eventname] = this.events[eventname].filter(fn => fn !== callback);
      console.log(this.events[eventname]);
    }
  }

  public publish = (event: IEvent): void => {
    if (!this.events[event.eventName]) return;
    this.events[event.eventName]
      .forEach(callback => callback(event));
  }

  get events(): Events {
    return this._events;
  }

}