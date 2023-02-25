import Position from "../grid/Position";
import Enemy from "./Enemy";
import Movement from "./Movement";

export default class Pawn extends Enemy {
    /*
    protected _position: Position;
    protected _oldPosition: Position;
    protected iconName: string;
    protected iconHeight: number;
    protected iconWidth: number;
    protected Icon: string;
*/

    constructor(x: number, y:number, health:number) {
        super(x,y, health);
        this.iconName = '../../images/pawn.svg';
        this.movement = [new Movement(0,1)];
    }

}