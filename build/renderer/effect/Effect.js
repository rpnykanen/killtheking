import Explosion from "./Explosion.js";
export default class Effect {
    constructor(context) {
        this.removeAnimations = () => {
            this.animations = this.animations.filter((animation) => !animation.isDead());
        };
        this.animationActive = () => this.animations.length != 0;
        this.explosion = (canvasPosition) => {
            const explosion = new Explosion(canvasPosition);
            this.animations.push(explosion);
            this.draw();
        };
        this.draw = () => {
            if (this.animationActive()) {
                this.animations.forEach((effect) => {
                    this.effectsContext.clearRect(0, 0, 1000, 1000);
                    const particles = effect.update();
                    if (particles) {
                        particles.forEach((particle) => {
                            this.effectsContext.beginPath();
                            this.effectsContext.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2, false);
                            this.effectsContext.fillStyle = `rgba(255,100, 0, ${particle.alpha})`;
                            this.effectsContext.fill();
                        });
                    }
                });
                this.removeAnimations();
                requestAnimationFrame(this.draw);
            }
        };
        this.effectsContext = context;
        this.animations = [];
    }
}
