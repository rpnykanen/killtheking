import Enemy from "./Enemy";
import Movement from "./Movement";
import Position from "../Position";

export default class Knight extends Enemy {
  constructor(position: Position, health: number) {
    super(position, health);
    this._icon = document.getElementById('knight') as HTMLImageElement;
    this._movements = [
      [new Movement(0, 0), new Movement(1, 2)],
      [new Movement(0, 0), new Movement(-1, 2)]
    ];
    this._score = 3;
  }

  get difficulty(): number { return 2; }
}