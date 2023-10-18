import Position from "./Position.js";
export default class GridSquare {
    constructor(x, y) {
        this.isEmpty = () => this._character === null;
        this.setCharacter = (character) => this._character = character;
        this.removeCharacter = () => this._character = null;
        this._position = new Position(x, y);
        this._character = null;
    }
    get position() { return this._position; }
    get character() { return this._character; }
    get x() { return this._position.x; }
    get y() { return this._position.y; }
}
