export default class PlayerMoveEvent {
    constructor(oldPosition, newPosition) {
        this.oldPosition = oldPosition;
        this.newPosition = newPosition;
        this.getOldPosition = () => this.oldPosition;
        this.getNewPosition = () => this.newPosition;
    }
}
PlayerMoveEvent.eventName = 'player.move';
PlayerMoveEvent.create = (oldPosition, newPosition) => {
    return new PlayerMoveEvent(oldPosition, newPosition);
};
