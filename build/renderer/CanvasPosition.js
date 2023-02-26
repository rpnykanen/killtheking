import Renderer from "./Renderer.js";
export default class CanvasPosition {
    constructor(_position) {
        this._position = _position;
        this._x = (this._position.x * Renderer.gridWidth + 20);
        this._y = (this._position.y * Renderer.gridWidth + 20);
    }
    get x() { return this._x; }
    get y() { return this._y; }
}
