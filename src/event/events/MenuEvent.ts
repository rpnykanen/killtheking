import IEvent from "./IEvent";

export default class MenuEvent implements IEvent {
  static EVENTNAME = 'menu.change';

  constructor(private page: string) {}

  get eventName() {return 'MenuEvent'}

  get pageName() {return this.page}
}