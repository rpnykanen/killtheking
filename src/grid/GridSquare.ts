import Character from "../character/Character.js";
import Position from "./Position.js";

export default class GridSquare {

    private character: Character | null;

    private position: Position;

    constructor(x: number, y: number) {
        this.position = new Position(x, y);
        this.character = null;
    }

    getPosition = () => this.position;

    get x(){ return this.position.x; }

    get y() { return this.position.y; }

    isEmpty = () => !this.character

    setCharacter = (character: Character) => this.character = character;

    getCharacter = (): Character | null => this.character;

    removeCharacter = () => this.character = null;

}