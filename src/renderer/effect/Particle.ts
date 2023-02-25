export default class Particle {

    private alpha = 1.0;
    
    // TODO: cleanup
    constructor(private x: number, private y:number, private dx:number, private dy: number, private up: boolean, private right: boolean, private ttl: number) {
        this.alpha = 1.0;
    }

    draw = () => {
        /*
        this.context.beginPath();
        this.context.arc(this.x, this.y, 1.5, Math.PI*2, false)
        this.context.fillStyle = `rgba(255,100, 0, ${this.alpha})`;
        this.context.fill();
        */
    }

    update = () => {
        this.x += this.right == true ? + this.dx : -this.dx;
        this.y += this.up == true ? + this.dy : -this.dy;
        if (this.ttl > 0) this.draw();
        this.ttl -= 10;
        this.alpha -= 0.03;
    }


    isDead = () => this.ttl <= 0;
}