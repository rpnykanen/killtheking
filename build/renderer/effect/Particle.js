export default class Particle {
    constructor(_x, _y, dx, dy, up, right, _ttl) {
        this._x = _x;
        this._y = _y;
        this.dx = dx;
        this.dy = dy;
        this.up = up;
        this.right = right;
        this._ttl = _ttl;
        this.update = () => {
            this._x += this.right == true ? +this.dx : -this.dx;
            this._y += this.up == true ? +this.dy : -this.dy;
            this._ttl -= 10;
            this._alpha -= 0.03;
        };
        this.isDead = () => this.ttl <= 0;
        this._alpha = 1.0;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get alpha() {
        return this._alpha;
    }
    get ttl() {
        return this._ttl;
    }
}
