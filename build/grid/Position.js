export default class Position {
    constructor(_x, _y) {
        this._x = _x;
        this._y = _y;
        this.equals = (position) => this._x === position.x && this._y === position.y;
        this.clone = () => new Position(this._x, this._y);
    }
    get x() { return this._x; }
    get y() { return this._y; }
}
