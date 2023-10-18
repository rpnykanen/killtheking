import Position from "../../grid/Position";

export default class PlayerShootEvent implements IEvent {

  static EVENTNAME = 'player.shoot';

  constructor(private _position: Position) { }

  static create = (position: Position) => new PlayerShootEvent(position);

  get position() { return this._position; }

  get eventName() { return PlayerShootEvent.EVENTNAME; }
}