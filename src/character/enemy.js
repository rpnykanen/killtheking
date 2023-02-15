import Character from "./character.js";
import Movement from "./movement.js";

export default class Enemy extends Character {

    static MoveState = 'move';
    static PredictState = 'predict';

    static iconHeight = 30;
    static iconWidth = 20;

    constructor(x,y, health, iconName){
        super();
        this.oldX = null;
        this.oldY = null;
        this.x = x;
        this.y = 0;
        this.newX = x;
        this.newY = 0;
        this.health = health;
        this.movement = [new Movement(0,1)]
        const icon = new Image();
        icon.src = iconName;
        this.icon = icon;
    }

    getState = () => {
        if (this.newX === this.x && this.newY === this.y) {
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

    predictPosition = (x,y) => {
        this.oldX = this.x;
        this.oldY = this.y;
        this.newX = x;
        this.newY = y;
    }

    moveToPredictedPosition = () => {
        this.x = this.newX;
        this.y = this.newY;
    }

}