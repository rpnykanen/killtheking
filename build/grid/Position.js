export default class Position {
    constructor(_x, _y) {
        this._x = _x;
        this._y = _y;
        this.addX = () => this._x += 1;
        this.substractX = () => this._x -= 1;
        this.equals = (position) => this._x === position.x && this._y === position.y;
        this.equalsXY = (x, y) => this._x === x && this._y === y;
        this.clone = () => new Position(this._x, this._y);
    }
    get x() { return this._x; }
    get y() { return this._y; }
}
