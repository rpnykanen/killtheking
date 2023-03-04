export default class PlayerShootEvent {
    constructor(_position) {
        this._position = _position;
    }
    get position() { return this._position; }
}
PlayerShootEvent.eventName = 'player.shoot';
PlayerShootEvent.create = (position) => {
    return new PlayerShootEvent(position);
};
