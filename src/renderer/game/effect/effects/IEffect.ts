import Particle from "./Particle";

export default interface IEffect {

  update(): void;

  isDead(): boolean;

  get particles(): Particle[];

}