import Position from "./position.js";

export default class GridSquare {
    constructor(x, y) {
        this.position = new Position(x,y);
        this.object = null;
    }

    getPosition = () => this.position;

    getX = () => this.position.getX();

    getY = () => this.position.getY();

    isEmpty = () => !this.object

    setObject = (object) => this.object = object;

    getObject = () => this.object;

}