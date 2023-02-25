export default class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.getX = () => this.x;
        this.getY = () => this.y;
        this.equals = (position) => this.x === position.getX() && this.y === position.getY();
    }
}
