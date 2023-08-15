import Enemy from "./Enemy.js";
import Icon from "./Icon.js";
import Movement from "./Movement.js";
export default class King extends Enemy {
    constructor(x, y, health) {
        super(x, y, health);
        this._icon = new Icon(30, 35, '../../images/king.svg');
        this._movement = [
            [new Movement(0, 0), new Movement(0, 0), new Movement(-1, 1)],
            [new Movement(0, 0), new Movement(0, 0), new Movement(0, 1)],
            [new Movement(0, 0), new Movement(0, 0), new Movement(1, 1)],
        ];
    }
}
