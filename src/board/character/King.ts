import Enemy from "./Enemy";
import Movement from "./Movement";
import Position from "../Position";

export default class King extends Enemy {
  constructor(position: Position, health: number) {
    super(position, health);
    this._icon = document.getElementById('king') as HTMLImageElement;
    this._movements = [
      [new Movement(0, 0), new Movement(0, 0), new Movement(-1, 1)],
      [new Movement(0, 0), new Movement(0, 0), new Movement(0, 1)],
      [new Movement(0, 0), new Movement(0, 0), new Movement(1, 1)],
    ]
    this._score = 5;
  }

  public reduceHealth = (damage: number): void => { this._health -= damage; }

  get isBoss(): boolean { return true; }

  get difficulty(): number { return 3; }
}