export default class PlayerShootEvent {
    constructor(_position) {
        this._position = _position;
    }
    get position() { return this._position; }
    get eventName() { return PlayerShootEvent.EVENTNAME; }
}
PlayerShootEvent.EVENTNAME = 'player.shoot';
PlayerShootEvent.create = (position) => new PlayerShootEvent(position);
