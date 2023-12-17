import Enemy from "./Enemy.js";
import Icon from "./Icon.js";
import Movement from "./Movement.js";
import Position from "../board/Position.js";

export default class Pawn extends Enemy {
  constructor(position: Position, health: number) {
    super(position, health);
    this._icon = new Icon(33, 33, '../../images/pawn.png');
    this._movement = [
      [new Movement(0, 0), new Movement(0, 1)]
    ];
  }
}