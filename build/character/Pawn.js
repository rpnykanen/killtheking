import Enemy from "./Enemy";
import Movement from "./Movement";
export default class Pawn extends Enemy {
    constructor(x, y, health) {
        super(x, y, health);
        this.iconName = '../../images/pawn.svg';
        this.movement = [new Movement(0, 1)];
    }
}
