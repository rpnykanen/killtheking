import Enemy from "./enemy.js";
import Movement from "./movement.js";

export default class Pawn extends Enemy {

    constructor(x,y, health = 1){
        super(x,y, health, '../../images/pawn.svg');
        this.movement = [new Movement(0,1)];
    }

    getIcon = () => this.icon;

}