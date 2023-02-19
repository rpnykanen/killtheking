import pubsub from '../event/pubSub.js';
import Particle from './particle.js';

export default class Particles {

    constructor(context) {
        this.particles = [];
        this.particleCount = 2;
        this.ttl = 300;
        this.context = context;
        pubsub.subscribe('enemy.death', this.fire);
    }

    fire = (position) => {
        console.log('fire');
        let myParticles = [];
        for(let i = 0; i <= this.particleCount; i++) {
            myParticles.push(new Particle(position, this.context));
        }
        const ttl = this.ttl;
        let live = 0;
        
        const interval = setInterval(()=>{
            myParticles.forEach(particle => particle.update());
            live += 20;
            if (live >= ttl) {
                console.log('clearing');
                myParticles = [];
                clearInterval(interval);
            }
        }, 10)
    }
    
}