import Enemy from "./Enemy";
import Icon from "./Icon";
import Movement from "./Movement";
import Position from "../Position";

export default class Knight extends Enemy {
  constructor(position: Position, health: number) {
    super(position, health);
    this._icon = new Icon(30, 35, '../../images/knight.png');
    this._movement = [
      [new Movement(0, 0), new Movement(1, 2)],
      [new Movement(0, 0), new Movement(-1, 2)]
    ];
  }
}