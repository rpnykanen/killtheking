import PubSub from "../event/PubSub.js";
import EnemyDeathEvent from "../event/events/EnemyDeathEvent.js";
import Position from "../grid/Position.js";
import Character from "./Character.js";
import Icon from "./Icon.js";
import Movement from "./Movement.js";

export default abstract class Enemy extends Character {

    static MoveState = 'move';
    static PredictState = 'predict';

    protected _newPosition: Position;
    protected _health: number;
    protected _movement: Movement;
    protected _score: number;

    constructor(x: number, y:number, health:number) {
        super();
        this._oldPosition = new Position(x,0);
        this._position = new Position(x,0);
        this._newPosition = new Position(x,0);
        this._health = health;
        this._movement = new Movement(0,1);
        this._score = 1;
    }

    get position(): Position {
        return this._position;
    }

    get movement(): Movement {
        return this._movement;
    }

    get oldPosition(): Position {
        return this._oldPosition;
    }

    get newPosition(): Position {
        return this._newPosition;
    }
 
    get icon(): Icon {
        return this._icon;
    }

    get score(): number {
        return this._score;
    }

    get health(): number {
        return this._health;
    }

    isDead = (): boolean => this._health <= 0;

    reduceHealth = (damage: number): void => {
        this._health -= damage;
        // if (this.isDead()) PubSub.publish(EnemyDeathEvent.create(this));
    }

    get state(): string { return this.position.equals(this.newPosition) ? Enemy.PredictState : Enemy.MoveState; }

    predictPosition = (position: Position): void => {
        this._oldPosition = this.position.clone();
        this._newPosition = position.clone();
    }

    moveToPredictedPosition = (): void => { this._position = this._newPosition.clone(); }

}