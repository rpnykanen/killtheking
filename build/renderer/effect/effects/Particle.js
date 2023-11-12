export default class Particle {
    constructor(_x, _y, dx, dy, up, right, _ttl, radius) {
        this._x = _x;
        this._y = _y;
        this.dx = dx;
        this.dy = dy;
        this.up = up;
        this.right = right;
        this._ttl = _ttl;
        this.update = () => {
            this._x += this.right == true ? +-this.dx : this.dx;
            this._y += this.up == true ? +-this.dy : this.dy;
            this._ttl -= 10;
        };
        this.isDead = () => this.ttl <= 0;
        this._alpha = 1.0;
        this._radius = radius ? radius : 1.5;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get radius() {
        return this._radius;
    }
    get alpha() {
        return this._alpha;
    }
    get ttl() {
        return this._ttl;
    }
}
