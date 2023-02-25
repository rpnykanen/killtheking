import Position from "./Position";
export default class GridSquare {
    constructor(x, y) {
        this.getPosition = () => this.position;
        this.getX = () => this.position.getX();
        this.getY = () => this.position.getY();
        this.isEmpty = () => !this.character;
        this.setCharacter = (character) => this.character = character;
        this.getCharacter = () => this.character;
        this.removeCharacter = () => this.character = null;
        this.position = new Position(x, y);
        this.character = null;
    }
}
