import Enemy from "./enemy.js";
import Movement from "./movement.js";

export default class Knight extends Enemy {

    constructor(x,y, health = 1){
        super(x,y, health, '../../images/knight.svg');
        this.movement = [new Movement(1,2)];
    }

}