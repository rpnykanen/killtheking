export default class Animation {
    // TODO: cleanup
    constructor(particles, destroy, context) {
        this.particles = particles;
        this.destroy = destroy;
        this.context = context;
    }

    loop = () => {
        requestAnimationFrame(this.loop);
        this.context.clearRect(0, 0, 1000, 1000);
        this.particles.forEach((particle)=>{
            particle.update();
            
            if (particle.isDead()) {
                this.particles = this.particles.filter((p) => p !== particle);
                particle = null;
            }
            if (this.particles.length == 0) {
                this.destroy(this);
            }
        });
    }

}