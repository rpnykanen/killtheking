import { GridOptions } from "../../types/Options";
import CanvasPosition from "../CanvasPosition";
import IEffect from "./effects/IEffect";
import Particle from "./effects/Particle";
import EffectFactory from "./effects/EffectFactory"

export default class EffectCanvas {

  private context: CanvasRenderingContext2D

  private animations: IEffect[] = [];

  private running = false;

  constructor(
    private options: GridOptions,
    private effectFactory: EffectFactory
    ) {
    const canvas = document.createElement("canvas");

    // todo
    canvas.id = options.effectCanvas;
    canvas.style.position = 'absolute';
    canvas.style.top = '100px';
    canvas.style.left = '10px';

    const context = canvas.getContext("2d")
    context && (this.context = context);
    document.getElementById(this.options.elementId)?.append(canvas);

    const canvasHeight = this.options.height * this.options.gridSquareHeight;
    const canvasWidth = this.options.width * this.options.gridSquareWidth + (2 * 10);
    this.context.canvas.width = canvasWidth;
    this.context.canvas.height = canvasHeight + 100;
  }

  public addAnimation = (canvasPosition: CanvasPosition, effectName: string) => {
    const effect = this.effectFactory.getEffect(effectName, canvasPosition);
    effect && this.animations.push(effect);
    this.requestAnimation();
  }

  private requestAnimation = (): void => {
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
    requestAnimationFrame(this.requestAnimation);
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