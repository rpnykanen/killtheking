import pubsub from "../event/PubSub.js";
import GameUpdateEvent from "../event/events/GameUpdateEvent.js";
import CanvasPosition from "./CanvasPosition.js";
import Effect from "./effect/Effect.js";
export default class Renderer {
    constructor() {
        this.drawGrid = () => {
            const padding = Renderer.canvasPadding;
            const width = Renderer.canvasWidth;
            const height = Renderer.canvasHeight;
            for (let x = 0; x <= width; x += Renderer.gridWidth) {
                let xFrom = 0.5 + x + padding;
                let yFrom = padding;
                let xTo = 0.5 + x + padding;
                let yTo = height + padding;
                this.context?.moveTo(xFrom, yFrom);
                this.context?.lineTo(xTo, yTo);
            }
            for (let x = 0; x <= height; x += Renderer.gridWidth) {
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
            this.effect.explosion(new CanvasPosition(position));
        };
        this.updateGrid = (gridSquares) => {
            gridSquares.forEach((gridSquare) => {
                this.clearGrid(gridSquare);
                if (gridSquare.isEmpty())
                    return;
                this.renderGrid(gridSquare);
            });
        };
        this.clearGrid = (gridSquare) => {
            const canvasPosition = new CanvasPosition(gridSquare.getPosition());
            this.context.clearRect(canvasPosition.x, canvasPosition.y, 30, 30);
        };
        this.renderGrid = (gridSquare) => {
            const object = gridSquare.getCharacter();
            if (!object) {
                return;
            }
            const icon = object.icon;
            const canvasPosition = new CanvasPosition(gridSquare.getPosition());
            this.context.drawImage(icon.image, canvasPosition.x, canvasPosition.y, icon.width, icon.height);
        };
        const canvas = document.getElementById("game");
        this.context = canvas.getContext("2d");
        const effectsCanvas = document.getElementById("effect");
        this.effect = new Effect(effectsCanvas.getContext("2d"));
        this.drawGrid();
        pubsub.subscribe(GameUpdateEvent.eventName, this.updateGrid);
    }
}
Renderer.canvasWidth = 400;
Renderer.canvasHeight = 600;
Renderer.canvasPadding = 10;
Renderer.gridWidth = 40;
