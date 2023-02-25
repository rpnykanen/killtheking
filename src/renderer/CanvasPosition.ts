import Position from "../grid/Position.js";
import Renderer from "./Renderer.js";

export default class GridPosition {

    private x: number;
    private y: number;
    
    constructor(private position:Position) {
        this.x = (this.position.getX()* Renderer.gridWidth + 20)
        this.y = (this.position.getX()* Renderer.gridWidth + 20)
    }
    getX = () => this.position.getX();
    getY = () => this.position.getY();
}