import Particle from "./Particle";

export default interface IEffect {

    update(): Particle[];

    isDead(): boolean;

}