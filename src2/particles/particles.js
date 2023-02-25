import pubsub from '../event/pubSub.js';
import Particle from './particle.js';
import Animation from './animation.js';

export default class Particles {
    // TODO: cleanup
    constructor() {
        this.activeAnimations = [];        
        this.particleCount = 20;
        this.ttl = 300;
        this.context = document.getElementById("effect").getContext("2d");
        pubsub.subscribe('enemy.death', this.explosion);

    }

    explosion = (position) => {
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
        this.activeAnimations.push(animation);
        animation.loop();
    }

    removeAnimation = (deadAnimation) => {
        this.activeAnimations = this.activeAnimations.filter((animation) => animation !== deadAnimation);
    }
    
}