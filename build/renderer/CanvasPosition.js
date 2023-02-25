import Renderer from "./Renderer.js";
export default class GridPosition {
    constructor(position) {
        this.position = position;
        this.getX = () => this.position.getX();
        this.getY = () => this.position.getY();
        this.x = (this.position.getX() * Renderer.gridWidth + 20);
        this.y = (this.position.getX() * Renderer.gridWidth + 20);
    }
}
