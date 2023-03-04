import pubsub from "../../event/PubSub.js";
import Position from "../../grid/Position.js";
import CanvasPosition from "../CanvasPosition.js";
import IEffect from "./IEffect.js";
import Particle from "./Particle.js";

export default class Explosion implements IEffect {

    private activeParticles: Particle[];

    private particleCount = 20;
    private ttl = 300;
 
    constructor(private _position: CanvasPosition) { 
        this.activeParticles = [];      
        // TODO: +15 not good.        
        const x = this._position.x+15;
        const y = this._position.y+15;
        for(let i = 0; i <= this.particleCount; i++) {
            const dx = (Math.random()-0.5)*2;
            const dy = (Math.random()-0.5)*2;
            const up = Math.floor((Math.random() * 10)) % 2 == 0 ? true : false;
            const right = Math.floor((Math.random() * 10)) % 2 == 0 ? true : false;
            this.activeParticles.push(new Particle(x, y, dx, dy, up, right, this.ttl));
        }
    }

    isDead = (): boolean => this.activeParticles.length === 0;

    update = (): Particle[] => {
        if (this.activeParticles.length > 0) {
            this.activeParticles.forEach((particle: Particle)=>{
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

}