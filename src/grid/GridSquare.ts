import Character from "../character/Character.js";
import Position from "./Position.js";

export default class GridSquare {

    private _character: Character | null;

    private _position: Position;

    constructor(x: number, y: number) {
        this._position = new Position(x, y);
        this._character = null;
    }

    get position() { return this._position; }

    get character(): Character | null  {return this._character};

    get x(){ return this._position.x; }

    get y() { return this._position.y; }

    isEmpty = () => !this._character

    setCharacter = (character: Character | null) => this._character = character;

    removeCharacter = () => this._character = null;

}