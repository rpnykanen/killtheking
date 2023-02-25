import GridPosition from "../CanvasPosition.js";
import Explosion from "./Explosion.js";
import IEffect from "./IEffect.js";

export default class Effect {

    private effectsContext: CanvasRenderingContext2D; 

    constructor(context: CanvasRenderingContext2D) {
        this.effectsContext = context;
    }

    explosion = (gridPosition: GridPosition): IEffect => {
        return new Explosion();
    }

}