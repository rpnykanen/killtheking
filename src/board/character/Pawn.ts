import Enemy from "./Enemy";
import Icon from "./Icon";
import Movement from "./Movement";
import Position from "../Position";

export default class Pawn extends Enemy {
  constructor(position: Position, health: number) {
    super(position, health);
    this._icon = new Icon(33, 33, '../../images/pawn.png');
    this._movements = [
      [new Movement(0, 0), new Movement(0, 1)]
    ];
  }
}