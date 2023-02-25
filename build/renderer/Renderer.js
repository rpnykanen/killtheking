import GridPosition from "./CanvasPosition.js";
import Effect from "./effect/Effect.js";
export default class Renderer {
    constructor() {
        this.drawGrid = () => {
            const padding = Renderer.canvasPadding;
            const width = Renderer.canvasWidth;
            const height = Renderer.canvasHeight;
            for (let x = 0; x <= width; x += 40) {
                let xFrom = 0.5 + x + padding;
                let yFrom = padding;
                let xTo = 0.5 + x + padding;
                let yTo = height + padding;
                this.context?.moveTo(xFrom, yFrom);
                this.context?.lineTo(xTo, yTo);
            }
            for (let x = 0; x <= height; x += 40) {
                let xFrom = padding;
                let yFrom = 0.5 + x + padding;
                let xTo = width + padding;
                let yTo = 0.5 + x + padding;
                this.context?.moveTo(xFrom, yFrom);
                this.context?.lineTo(xTo, yTo);
            }
            this.context.strokeStyle = "black";
            this.context?.stroke();
        };
        this.enemyDeath = (position) => {
            this.effect.explosion(new GridPosition(position));
        };
        const canvas = document.getElementById("game");
        this.context = canvas.getContext("2d");
        const effectsCanvas = document.getElementById("effect");
        this.effect = new Effect(effectsCanvas.getContext("2d"));
        this.drawGrid();
    }
}
Renderer.canvasWidth = 400;
Renderer.canvasHeight = 600;
Renderer.canvasPadding = 10;
Renderer.gridWidth = 40;
