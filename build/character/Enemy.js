import Position from "../grid/Position.js";
import Character from "./Character.js";
import Movement from "./Movement.js";
export default class Enemy extends Character {
    constructor(x, y, health) {
        super();
        this.isDead = () => this._health <= 0;
        this.reduceHealth = (damage) => {
            this._health -= damage;
        };
        this.predictPosition = (position) => {
            this._oldPosition = this.position.clone();
            this._newPosition = position.clone();
        };
        this.moveToPredictedPosition = () => { this._position = this._newPosition.clone(); };
        this._oldPosition = new Position(x, 0);
        this._position = new Position(x, 0);
        this._newPosition = new Position(x, 0);
        this._health = health;
        this._movement = new Movement(0, 1);
        this._score = 1;
    }
    get position() {
        return this._position;
    }
    get movement() {
        return this._movement;
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
    get score() {
        return this._score;
    }
    get health() {
        return this._health;
    }
    get state() { return this.position.equals(this.newPosition) ? Enemy.PredictState : Enemy.MoveState; }
}
Enemy.MoveState = 'move';
Enemy.PredictState = 'predict';
