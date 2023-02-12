import Movement from "./movement.js";

export default class Enemy {

    static MoveState = 'move';
    static PredictState = 'predict';

    static iconHeight = 35;
    static iconWidth = 25;

    constructor(x,y, health, iconName){
        this.oldX = x;
        this.oldY = 0;
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
        console.log('prediction', this.newX === this.x && this.newY === this.y);
        if (this.newX === this.x && this.newY === this.y) {
            return Enemy.PredictState;
        }
        return Enemy.MoveState;
    }

    getIconSize = () => {
        return {"height": Enemy.iconHeight, "width": Enemy.iconWidth}
    }

    getMovement = () => this.movement;

    getPosition = () => { return {"x": this.x, "y": this.y} };

    getOldPosition = () => { return {"oldX": this.oldX, "oldY": this.oldY} };

    getHealth = () => this.health;

    reduceHealth = (health) => {
        this.health -= health;
    }

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