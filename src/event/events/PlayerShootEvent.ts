import Position from "../../grid/Position";

export default class PlayerShootEvent implements IEvent {

    static eventName: string = 'player.shoot';

    constructor(private _position: Position) {
    }

    static create = (position: Position) => {
        return new PlayerShootEvent(position);
    }

    get position() { return this._position; } 

}