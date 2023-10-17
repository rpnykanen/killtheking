import Position from "../grid/Position.js";
import Character from "./Character.js";
import Movement from "./Movement.js";
export default class Enemy extends Character {
    constructor(position, health) {
        super();
        this._index = 0;
        this.setPosition = (position) => {
            this._position = position;
            if (this._index == (this._movement[0].length - 1)) {
                this._index = 0;
            }
            else {
                this._index += 1;
            }
        };
        this.isDead = () => this._health <= 0;
        this.reduceHealth = (damage) => {
            this._health -= damage;
        };
        this._position = position;
        this._health = health;
        this._movement = [
            [new Movement(0, 0), new Movement(0, 1)],
        ];
    }
    get position() {
        return this._position;
    }
    get movement() {
        return this._movement[0][this._index];
    }
    get possiblePositions() {
        return this._movement.map((movementArray) => {
            return new Position(this._position.x + movementArray[this._index].x, this._position.y + movementArray[this._index].y);
        });
    }
    get icon() {
        return this._icon;
    }
    get health() {
        return this._health;
    }
}
