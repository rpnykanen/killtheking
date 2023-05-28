import Enemy from "./Enemy.js";
import Icon from "./Icon.js";
import Movement from "./Movement.js";
export default class Pawn extends Enemy {
    constructor(x, y, health) {
        super(x, y, health);
        this._icon = new Icon(33, 33, '../../images/pawn.png');
        this._movement = new Movement(0, 1);
        this._score = 2;
    }
}
