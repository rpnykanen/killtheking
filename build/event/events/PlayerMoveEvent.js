export default class PlayerMoveEvent {
    constructor(_oldPosition, _newPosition) {
        this._oldPosition = _oldPosition;
        this._newPosition = _newPosition;
    }
    get oldPosition() { return this._oldPosition; }
    get newPosition() { return this._newPosition; }
}
PlayerMoveEvent.eventName = 'player.move';
PlayerMoveEvent.create = (oldPosition, newPosition) => {
    return new PlayerMoveEvent(oldPosition, newPosition);
};
