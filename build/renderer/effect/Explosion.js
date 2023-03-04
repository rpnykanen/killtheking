import Particle from "./Particle.js";
export default class Explosion {
    constructor(_position) {
        this._position = _position;
        this.particleCount = 20;
        this.ttl = 300;
        this.isDead = () => this.activeParticles.length === 0;
        this.update = () => {
            if (this.activeParticles.length > 0) {
                this.activeParticles.forEach((particle) => {
                    particle.update();
                    if (particle.isDead()) {
                        this.activeParticles = this.activeParticles.filter((p) => p !== particle);
                    }
                });
                return this.activeParticles;
            }
            else {
                return [];
            }
        };
        this.activeParticles = [];
        const x = this._position.x + 15;
        const y = this._position.y + 15;
        for (let i = 0; i <= this.particleCount; i++) {
            const dx = (Math.random() - 0.5) * 2;
            const dy = (Math.random() - 0.5) * 2;
            const up = Math.floor((Math.random() * 10)) % 2 == 0 ? true : false;
            const right = Math.floor((Math.random() * 10)) % 2 == 0 ? true : false;
            this.activeParticles.push(new Particle(x, y, dx, dy, up, right, this.ttl));
        }
    }
}
