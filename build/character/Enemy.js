import Position from "../grid/Position";
import Movement from "./Movement";
export default class Enemy {
    constructor(x, y, health) {
        this._oldPosition = new Position(x, 0);
        this._position = new Position(x, 0);
        this._newPosition = new Position(x, 0);
        this._health = health;
        this._movement = [new Movement(0, 1)];
    }
    get position() {
        return this._position;
    }
    get oldPosition() {
        return this._oldPosition;
    }
    get newPosition() {
        return this._newPosition;
    }
    get icon() {
        return this._icon;
    }
}
