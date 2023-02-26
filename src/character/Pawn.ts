import Position from "../grid/Position.js";
import Enemy from "./Enemy.js";
import Icon from "./Icon.js";
import Movement from "./Movement.js";

export default class Pawn extends Enemy {
    constructor(x: number, y:number, health:number) {
        super(x,y, health);
        this._icon = new Icon(25,30, '../../images/pawn.svg');
        this._movement = [new Movement(0,1)];
    }
}