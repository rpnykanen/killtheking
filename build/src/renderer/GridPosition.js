export default class GridPosition {
    constructor(position) {
        this.position = position;
        this.getX = () => this.position.getX();
        this.getY = () => this.position.getY();
    }
}
