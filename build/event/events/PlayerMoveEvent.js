export default class PlayerMoveEvent {
    constructor(_oldPosition, _newPosition) {
        this._oldPosition = _oldPosition;
        this._newPosition = _newPosition;
    }
    get oldPosition() { return this._oldPosition; }
    get newPosition() { return this._newPosition; }
    get eventName() { return PlayerMoveEvent.EVENTNAME; }
}
PlayerMoveEvent.EVENTNAME = 'player.move';
PlayerMoveEvent.create = (oldPosition, newPosition) => new PlayerMoveEvent(oldPosition, newPosition);
