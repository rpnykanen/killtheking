export default class Position {
    constructor(private _x: number, private _y: number){
    }
    get x () { return this._x; }
    get y () { return this._y; }
    equals = (position: Position) => this._x === position.x && this._y === position.y;
    clone = () => new Position(this._x, this._y);
}