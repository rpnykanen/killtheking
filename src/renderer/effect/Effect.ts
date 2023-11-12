import { GridOptions } from "../../types/Options.js";
import CanvasPosition from "../CanvasPosition.js";
import Explosion from "./effects/Explosion.js";
import IEffect from "./effects/IEffect.js";
import Particle from "./effects/Particle.js";

export default class EffectCanvas {

  private context: CanvasRenderingContext2D

  private animations: IEffect[] = [];

  private running: boolean = false;

  constructor(private options: GridOptions) {
    const canvas = document.createElement("canvas");
    canvas.id = 'effect';
    canvas.style.position = 'absolute';
    canvas.style.top = '100px';
    canvas.style.left = '10px';

    this.context = canvas.getContext("2d")!
    document.getElementById(this.options.elementId)?.append(canvas);

    const canvasHeight = this.options.height * this.options.gridSquareHeight;
    const canvasWidth = this.options.width * this.options.gridSquareWidth + (2 * 10);
    this.context.canvas.width = canvasWidth;
    this.context.canvas.height = canvasHeight + 100;;

  }

  public addAnimation = (canvasPosition: CanvasPosition, effectName: string) => {
    const effect = this.getEffect(canvasPosition, effectName);
    effect && this.animations.push(effect);
    console.log(this.animations);
    this.requestAnimation();
  }

  // not like this.
  private getEffect = (pos: CanvasPosition, effectName: string): IEffect | null => {
    switch(effectName) {
      case 'explosion': 
        return new Explosion(pos);
        break;
    }
    return null;
  }

  private requestAnimation = (): void => {
    !this.running && this.runEffects();
  }

  private runEffects = (): void => {
    if (!this.hasAnimations()) {
      this.running = false;
      return;
    }
    
    this.running = true;
    this.context.clearRect(0, 0, 1000, 1000);
    this.animations.forEach((effect: IEffect) => {
      effect.update();
      this.drawParticles(effect)
    });
    this.removeAnimations();
    requestAnimationFrame(this.runEffects);

  }

  private hasAnimations = () => this.animations.length != 0;

  private removeAnimations = () => {
    this.animations = this.animations.filter((animation: IEffect) => !animation.isDead());
  }

  private drawParticles = (effect: IEffect) => {
    effect.particles.forEach((particle: Particle) => {
      this.context.beginPath();
      this.context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false)
      this.context.fillStyle = `rgba(255,100, 0, ${particle.alpha})`;
      this.context.fill();
    });
  } 

}