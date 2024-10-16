/**
 * Position on grid.
 */
export default class Position {
  constructor(private _x: number, private _y: number) {}

  public static createNullPosition = (): Position => {
    return new this(-1,-1);
  }

  get x() { return this._x; }
  get y() { return this._y; }

  public addX = () => this._x += 1;

  public substractX = () => this._x -= 1;

  public equals = (position: Position) => this._x === position.x && this._y === position.y;

  public notNull = () => this._x !== -1 || this._y !== -1;

  public clone = () => new Position(this._x, this._y);
}