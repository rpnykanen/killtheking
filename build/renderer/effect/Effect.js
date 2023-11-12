import Explosion from "./effects/Explosion.js";
export default class EffectCanvas {
    constructor(options) {
        this.options = options;
        this.animations = [];
        this.running = false;
        this.addAnimation = (canvasPosition, effectName) => {
            const effect = this.getEffect(canvasPosition, effectName);
            effect && this.animations.push(effect);
            console.log(this.animations);
            this.requestAnimation();
        };
        this.getEffect = (pos, effectName) => {
            switch (effectName) {
                case 'explosion':
                    return new Explosion(pos);
                    break;
            }
            return null;
        };
        this.requestAnimation = () => {
            !this.running && this.runEffects();
        };
        this.runEffects = () => {
            if (!this.hasAnimations()) {
                this.running = false;
                return;
            }
            this.running = true;
            this.context.clearRect(0, 0, 1000, 1000);
            this.animations.forEach((effect) => {
                effect.update();
                this.drawParticles(effect);
            });
            this.removeAnimations();
            requestAnimationFrame(this.runEffects);
        };
        this.hasAnimations = () => this.animations.length != 0;
        this.removeAnimations = () => {
            this.animations = this.animations.filter((animation) => !animation.isDead());
        };
        this.drawParticles = (effect) => {
            effect.particles.forEach((particle) => {
                this.context.beginPath();
                this.context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false);
                this.context.fillStyle = `rgba(255,100, 0, ${particle.alpha})`;
                this.context.fill();
            });
        };
        const canvas = document.createElement("canvas");
        canvas.id = 'effect';
        canvas.style.position = 'absolute';
        canvas.style.top = '100px';
        canvas.style.left = '10px';
        this.context = canvas.getContext("2d");
        document.getElementById(this.options.elementId)?.append(canvas);
        const canvasHeight = this.options.height * this.options.gridSquareHeight;
        const canvasWidth = this.options.width * this.options.gridSquareWidth + (2 * 10);
        this.context.canvas.width = canvasWidth;
        this.context.canvas.height = canvasHeight + 100;
        ;
    }
}
