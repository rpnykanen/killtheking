import PubSub from "../event/PubSub.js";
import EnemyDeathEvent from "../event/events/EnemyDeathEvent.js";
import Position from "../grid/Position.js";
import Character from "./Character.js";
import Icon from "./Icon.js";
import Movement from "./Movement.js";

export default abstract class Enemy implements Character {

    static MoveState = 'move';
    static PredictState = 'predict';

    protected _position: Position;
    protected _oldPosition: Position;
    protected _newPosition: Position;
    protected _health: number;
    protected _movement: Movement;
    
    protected _iconName: string;
    protected _iconHeight: number;
    protected _iconWidth: number;
    protected _icon: Icon;

    constructor(x: number, y:number, health:number) {
        this._oldPosition = new Position(x,0);
        this._position = new Position(x,0);
        this._newPosition = new Position(x,0);
        this._health = health;
        this._movement = new Movement(0,1);
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

    isDead = () => this._health <= 0;

    reduceHealth = (damage: number) => {
        this._health -= damage;
        if (this.isDead()) PubSub.publish(EnemyDeathEvent.eventName, EnemyDeathEvent.create(this));
    }

    get state() {
        if (this.position.equals(this.newPosition)) {
            return Enemy.PredictState;
        }
        return Enemy.MoveState;
    }

    predictPosition = (position: Position) => {
        this._oldPosition = this.position.clone();
        this._newPosition = position.clone();
    }

    moveToPredictedPosition = () => {
        this._position = this._newPosition.clone();
    }

}