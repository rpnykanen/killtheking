import Explosion from "./Explosion.js";
export default class Effect {
    constructor(context) {
        this.explosion = (gridPosition) => {
            return new Explosion();
        };
        this.effectsContext = context;
    }
}
