import IEvent from "./events/IEvent";

type Events = {
  [index: string]: CallableFunction[];
}

export default class EventManager {

  private _events: Events = {};

  subscribe = (eventname: string, callback: CallableFunction): void => {
    this.events[eventname] = this.events[eventname] || [];
    this.events[eventname].push(callback);
  }

  unsubscribe = (eventname: string, callback: CallableFunction): void => {
    if (this.events[eventname]) {
      this.events[eventname] = this.events[eventname].filter(fn => fn !== callback);
    }
  }

  publish = (event: IEvent): void => {
    if (!this.events[event.eventName]) return;
    this.events[event.eventName]
      .forEach(callback => callback(event));
  }

  get events(): Events {
    return this._events;
  }

}