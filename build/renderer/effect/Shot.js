import Particle from "./Particle.js";
export default class Shot {
    constructor(_position) {
        this._position = _position;
        this.ttl = 1200;
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
        const x = this._position.x - 5;
        const x2 = this._position.x + 35;
        const y = this._position.y - 10;
        this.activeParticles.push(new Particle(x, y, 0.00, 5, true, true, this.ttl, 3));
        this.activeParticles.push(new Particle(x2, y, 0.00, 5, true, true, this.ttl, 3));
    }
}
