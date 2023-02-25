import IEffect from "./IEffect.js";
import Particle from "./Particle.js";

export default class Explosion implements IEffect {

    private activeParticles: Particle[];

    private particleCount = 20;
    private ttl = 300;

    // TODO: cleanup
    constructor() {       
        // this.particleCount = 20;
        // this.ttl = 300;
        // this.context = document.getElementById("effect").getContext("2d");
        // pubsub.subscribe('enemy.death', this.explosion);

    }

    update = (position: any): void => {

    }

    explosion = (position: number) => {
        /*
        console.log('boom');
        const particles = [];
        const {x,y} = position.toCanvasPosition();
        for(let i = 0; i <= this.particleCount; i++) {
            const dx = (Math.random()-0.5)*2;
            const dy = (Math.random()-0.5)*2;
            const up = Math.floor((Math.random() * 10)) % 2 == 0 ? true : false;
            const right = Math.floor((Math.random() * 10)) % 2 == 0 ? true : false;
            particles.push(new Particle(x, y, dx, dy, up, right, this.context));
        }
        
        const animation = new Animation(particles, this.removeAnimation, this.context)
        this.activeParticles.push(animation);
        animation.loop();
        */
    }
    /*
    removeAnimation = (deadAnimation) => {
        this.activeAnimations = this.activeAnimations.filter((animation) => animation !== deadAnimation);
    }
    */

}