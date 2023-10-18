import CanvasPosition from "../CanvasPosition.js";
import Explosion from "./Explosion.js";
import IEffect from "./IEffect.js";
import Particle from "./Particle";

export default class Effect {

  private effectsContext: CanvasRenderingContext2D;

  private animations: IEffect[];


  constructor(context: CanvasRenderingContext2D) {
    this.effectsContext = context;
    this.animations = [];
  }

  private removeAnimations = () => {
    this.animations = this.animations.filter((animation: IEffect) => !animation.isDead());
  }

  private animationActive = () => this.animations.length != 0;

  explosion = (canvasPosition: CanvasPosition) => {
    const explosion = new Explosion(canvasPosition);
    this.animations.push(explosion);
    this.draw();
  }

  private draw = () => {
    if (this.animationActive()) {
      this.animations.forEach((effect: IEffect) => {
        this.effectsContext.clearRect(0, 0, 1000, 1000);

        const particles = effect.update();
        if (particles) {
          particles.forEach((particle: Particle) => {
            this.effectsContext.beginPath();
            this.effectsContext.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false)
            this.effectsContext.fillStyle = `rgba(255,100, 0, ${particle.alpha})`;
            this.effectsContext.fill();
          });
        }
      });
      this.removeAnimations();
      requestAnimationFrame(this.draw);
    }
  }

}