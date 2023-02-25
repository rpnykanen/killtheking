export default class Particle {
    constructor(x, y, dx, dy, up, right, ttl) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.up = up;
        this.right = right;
        this.ttl = ttl;
        this.alpha = 1.0;
        this.draw = () => {
        };
        this.update = () => {
            this.x += this.right == true ? +this.dx : -this.dx;
            this.y += this.up == true ? +this.dy : -this.dy;
            if (this.ttl > 0)
                this.draw();
            this.ttl -= 10;
            this.alpha -= 0.03;
        };
        this.isDead = () => this.ttl <= 0;
        this.alpha = 1.0;
    }
}
