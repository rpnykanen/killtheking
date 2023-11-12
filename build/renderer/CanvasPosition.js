export default class CanvasPosition {
    constructor(_x, _y, _icon) {
        this._x = _x;
        this._y = _y;
        this._icon = _icon;
        this.isEmpty = () => { return this.icon !== null; };
    }
    get icon() { return this._icon; }
    get x() { return this._x; }
    get y() { return this._y; }
    get iconPositionX() { return this._x; }
    get iconPositionY() { return this._y - 1; }
    get gridPositionX() { return this._x - 4; }
    get gridPositionY() { return this._y - 4; }
}
