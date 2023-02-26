import Position from "../../grid/Position";

export default class PlayerMoveEvent implements IEvent {

    static eventName: string = 'player.move';

    constructor(private oldPosition: Position, private newPosition: Position) {
    }

    static create = (oldPosition: Position, newPosition: Position) => {
        return new PlayerMoveEvent(oldPosition, newPosition);
    }

    getOldPosition = () => this.oldPosition;

    getNewPosition = () => this.newPosition;

}