import CanvasPosition from "@renderer/CanvasPosition";
import IEffect from "./IEffect";
import Particle from "./Particle";

export default class Explosion implements IEffect {
  private activeParticles: Particle[];
  private particleCount = 20;
  private ttl = 300;

  constructor(private _position: CanvasPosition) {
    this.activeParticles = [];
    const x = this._position.centerX;
    const y = this._position.centerY;
    
    for (let i = 0; i < this.particleCount; i++) {
      const dx = (Math.random() - 0.5) * 2;
      const dy = (Math.random() - 0.5) * 2;
      const up = Math.floor((Math.random() * 10)) % 2 == 0 ? true : false;
      const right = Math.floor((Math.random() * 10)) % 2 == 0 ? true : false;
      this.activeParticles.push(new Particle(x, y, dx, dy, up, right, this.ttl));
    }
  }

  public isDead = (): boolean => this.activeParticles.length === 0;

  public update = (): Particle[] => {
    if (this.activeParticles.length > 0) {
      this.activeParticles.forEach((particle: Particle) => {
        particle.update();
        if (particle.isDead()) {
          this.activeParticles = this.activeParticles.filter((p: Particle) => p !== particle);
        }
      });
      return this.activeParticles;
    } else {
      return [];
    }
  }

  get particles(): Particle[] { return this.activeParticles; }

}