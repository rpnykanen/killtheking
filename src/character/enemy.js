import Character from "./character.js";
import Movement from "./movement.js";
import Position from "../grid/position.js";

export default class Enemy extends Character {

    static MoveState = 'move';
    static PredictState = 'predict';

    static iconHeight = 30;
    static iconWidth = 20;

    constructor(x,y, health, iconName){
        super();
        this.oldPosition = null;
        this.position = new Position(x,0);
        this.newPosition = new Position(x,0);
        this.health = health;

        const icon = new Image();
        icon.src = iconName;
        this.icon = icon;

        this.movement = [new Movement(0,1)]
    }

    getState = () => {
        if (this.position.equals(this.newPosition)) {
            return Enemy.PredictState;
        }
        return Enemy.MoveState;
    }

    getIconSize = () => {
        return {"height": Enemy.iconHeight, "width": Enemy.iconWidth}
    }

    getMovement = () => this.movement;

    getHealth = () => this.health;

    isDead = () => this.health <= 0;

    reduceHealth = damage => this.health -= damage;

    predictPosition = (position) => {
        this.oldPosition = this.position.clone();
        this.newPosition = position;
    }

    moveToPredictedPosition = () => {
        this.position = this.newPosition.clone();
    }

}