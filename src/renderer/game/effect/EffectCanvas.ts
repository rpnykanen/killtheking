import CanvasPosition from "../CanvasPosition";
import CanvasFactory from "@renderer/CanvasFactory";
import EffectFactory from "./effects/EffectFactory"
import { GridConfiguration } from "@type/Configurations";
import IEffect from "./effects/IEffect";
import Particle from "./effects/Particle";

// TODO rewrite.
export default class EffectCanvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D

  private animations: IEffect[] = [];

  constructor(
    private gridConfiguration: GridConfiguration,
    private effectFactory: EffectFactory,
    private canvasFactory: CanvasFactory
  ) {
    this.canvas = this.canvasFactory.createCanvas('effect');
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  public draw = () => {
    document.getElementById(this.gridConfiguration.elementId)?.append(this.canvas);
  }

  public addAnimation = (canvasPosition: CanvasPosition, effectName: string) => {
    const effect = this.effectFactory.getEffect(effectName, canvasPosition);
    effect && this.animations.push(effect);
    this.requestAnimation();
  }

  private requestAnimation = (): void => {
    if (!this.hasAnimations()) {
      return;
    }
    
    //todo maybe only the square ? 
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