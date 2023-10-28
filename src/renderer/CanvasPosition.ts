import Position from "../grid/Position.js";
import Renderer from "./Renderer.js";

export default class CanvasPosition {
    private _x: number;
    private _y: number;
    private _origin: Position;
    
    constructor(private _position:Position) {
        this._x = (this._position.x* Renderer.gridSquareWidth + 15)
        this._y = (this._position.y* Renderer.gridSquareWidth + 20)
    }
    get x(): number { return this._x }
    get y(): number { return this._y } 
    get origin(): Position {return this._origin}
}