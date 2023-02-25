export default class Particle {
    // TODO: cleanup
    constructor(x, y, dx, dy, up, right, context) {
        this.originalX = x;
        this.originalY = y;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.ttl = 600;
        this.up = up;
        this.right = right; 
        this.context = context;
        this.alpha = 1;
    }

    draw = () => {
        this.context.beginPath();
        this.context.arc(this.x, this.y, 1.5, Math.PI*2, false)
        this.context.fillStyle = `rgba(255,100, 0, ${this.alpha})`;
        this.context.fill();
    }

    update = () => {
        this.x += this.right == true ? + this.dx : -this.dx;
        this.y += this.up == true ? + this.dy : -this.dy;
        if (this.ttl > 0) this.draw();
        this.ttl -= 10;
        this.alpha -= 0.03;
    }

    getOriginalPosition = () => {this.originalX, this.originalY}

    isDead = () => this.ttl <= 0;
}