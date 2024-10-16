import Character from "./character/Character";
import Enemy from "./character/Enemy";
import Position from "./Position";

/**
 * Single square on grid.
 */
export default class GridSquare {
  private _character: Character | Enemy | null;

  constructor(private _position: Position) {
    this._character = null;
  }

  public notNull = () => this.position.notNull();

  public isEmpty = () => this._character === null;

  public setCharacter = (character: Character | Enemy | null) => this._character = character;

  public removeCharacter = () => this._character = null;

  get position() { return this._position; }

  get x() { return this._position.x; }

  get y() { return this._position.y; }

  get icon () {return this._character?.icon ?? null}

  public static create = () => {
    return new this(Position.createNullPosition());
  }
}