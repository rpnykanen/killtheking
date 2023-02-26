import Position from "./Position.js";
export default class GridSquare {
    constructor(x, y) {
        this.getPosition = () => this.position;
        this.isEmpty = () => !this.character;
        this.setCharacter = (character) => this.character = character;
        this.getCharacter = () => this.character;
        this.removeCharacter = () => this.character = null;
        this.position = new Position(x, y);
        this.character = null;
    }
    get x() { return this.position.x; }
    get y() { return this.position.y; }
}
