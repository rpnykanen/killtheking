import Position from "../grid/Position.js";
import Character from "./Character.js";
import Icon from "./Icon.js";
import Movement from "./Movement.js";

export default abstract class Enemy extends Character {

  protected _health: number;
  protected _movement: Array<Movement[]>;
  protected _score: number;
  protected _index = 0;

  constructor(position: Position, health: number) {
    super();
    this._position = position;
    this._health = health;
    this._movement = [
      [new Movement(0, 0), new Movement(0, 1)],
    ];
  }

  get position(): Position {
    return this._position;
  }

  get movement(): Movement {
    return this._movement[0][this._index];
  }

  get possiblePositions(): Position[] {
    return this._movement.map((movementArray) => {
      return new Position(
        this._position.x + movementArray[this._index].x,
        this._position.y + movementArray[this._index].y,
      );
    });
  }

  get icon(): Icon {
    return this._icon;
  }

  get health(): number {
    return this._health;
  }

  setPosition = (position: Position) => {
    this._position = position;
    if (this._index == (this._movement[0].length - 1)) {
      this._index = 0;
    } else {
      this._index += 1;
    }
  }

  isDead = (): boolean => this._health <= 0;

  reduceHealth = (damage: number): void => {
    this._health -= damage;
  }

}