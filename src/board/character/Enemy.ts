import Character from "./Character";
import Icon from "./Icon";
import Movement from "./Movement";
import Position from "../Position";

export default abstract class Enemy extends Character {

  protected _health: number;
  protected _movement: Array<Movement[]>;
  protected _score: number;
  protected _movementIndex = 0;

  constructor(position: Position, health: number) {
    super();
    this._position = position;
    this._health = health;
    this._movement = [
      [new Movement(0, 0), new Movement(0, 1)],
    ];
  }

  public setPosition = (position: Position) => {
    this._position = position;
    this._movementIndex = (this._movementIndex == (this._movement[0].length - 1))
      ? 0 
      : this._movementIndex + 1;
  }

  public reduceHealth = (damage: number): void => {
    this._health -= damage;
  }

  public isDead = (): boolean => this._health <= 0;

  get position(): Position {
    return this._position;
  }

  get movement(): Movement {
    return this._movement[0][this._movementIndex];
  }

  get possiblePositions(): Position[] {
    return this._movement.map((movementArray) => {
      return new Position(
        this._position.x + movementArray[this._movementIndex].x,
        this._position.y + movementArray[this._movementIndex].y,
      );
    });
  }

  get icon(): Icon {
    return this._icon;
  }

  get health(): number {
    return this._health;
  }

}