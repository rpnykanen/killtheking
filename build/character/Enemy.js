import PubSub from "../event/PubSub.js";
import EnemyDeathEvent from "../event/events/EnemyDeathEvent.js";
import Position from "../grid/Position.js";
import Movement from "./Movement.js";
export default class Enemy {
    constructor(x, y, health) {
        this.isDead = () => this._health <= 0;
        this.reduceHealth = (damage) => {
            this._health -= damage;
            if (this.isDead())
                PubSub.publish(EnemyDeathEvent.create(this));
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
    get state() { return this.position.equals(this.newPosition) ? Enemy.PredictState : Enemy.MoveState; }
}
Enemy.MoveState = 'move';
Enemy.PredictState = 'predict';
