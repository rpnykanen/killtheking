import Enemy from "./Enemy";
import Movement from "./Movement";
import Position from "../Position";

export default class Pawn extends Enemy {
  constructor(position: Position, health: number) {
    super(position, health);
    this._icon = document.getElementById('pawn') as HTMLImageElement;
    this._movements = [
      [new Movement(0, 0), new Movement(0, 1)]
    ];
    this._score = 1;
  }
}