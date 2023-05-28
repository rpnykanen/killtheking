import Enemy from "./Enemy.js";
import Icon from "./Icon.js";
import Movement from "./Movement.js";

export default class Knight extends Enemy {
    constructor(x: number, y:number, health:number) {
        super(x,y, health);
        this._icon = new Icon(30,35, '../../images/knight.png');
        this._movement = new Movement(1,2);
        this._score = 5;
    }
}