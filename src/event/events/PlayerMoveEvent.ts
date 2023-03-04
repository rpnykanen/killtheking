import Position from "../../grid/Position";

export default class PlayerMoveEvent implements IEvent {

    static eventName: string = 'player.move';

    constructor(private _oldPosition: Position, private _newPosition: Position) {
    }

    static create = (oldPosition: Position, newPosition: Position) => {
        return new PlayerMoveEvent(oldPosition, newPosition);
    }

    get oldPosition() { return this._oldPosition; } 

    get newPosition() { return this._newPosition; } 

}