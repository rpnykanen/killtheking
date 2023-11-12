export default class PlayerShootEvent {
    constructor(_position) {
        this._position = _position;
    }
    get x() { return this._position.x; }
    get y() { return this._position.y; }
    get eventName() { return PlayerShootEvent.EVENTNAME; }
}
PlayerShootEvent.EVENTNAME = 'player.shoot';
