import IEvent from "./events/Ievent";

type Events = {
  [index: string]: CallableFunction[];
}

export default class EventManager {

  private _events: Events = {};

  subscribe = (eventname: string, callback: CallableFunction): void => {
    this.events[eventname] = this.events[eventname] || [];
    this.events[eventname].push(callback);
  }

  unsubscribe = (event: IEvent, callback: CallableFunction): void => {
    if (this.events[event.eventName]) {
      this.events[event.eventName] = this.events[event.eventName].filter(fn => fn !== callback);
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