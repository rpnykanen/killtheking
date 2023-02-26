import pubsub from "../event/PubSub.js";
import GameUpdateEvent from "../event/events/GameUpdateEvent.js";
import GridSquare from "../grid/GridSquare.js";
import Position from "../grid/Position.js";
import CanvasPosition from "./CanvasPosition.js";
import Effect from "./effect/Effect.js";

export default class Renderer {

    static canvasWidth = 400;
    static canvasHeight = 600;
    static canvasPadding = 10;

    static gridWidth = 40;

    private context: CanvasRenderingContext2D;

    private effect: Effect;

    constructor() {
        const canvas = <HTMLCanvasElement> document.getElementById("game");
        this.context = canvas.getContext("2d")!;
        const effectsCanvas = <HTMLCanvasElement> document.getElementById("effect");
        this.effect = new Effect(effectsCanvas.getContext("2d")!);
        this.drawGrid();

        //TODO: Sub to enemy death.
        pubsub.subscribe(GameUpdateEvent.eventName, this.updateGrid)
        
    }

    drawGrid = () => {
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
        
        this.context!.strokeStyle = "black";
        this.context?.stroke();
        
    }

    enemyDeath = (position: Position) => {
        this.effect.explosion(new CanvasPosition(position));
    }

    
    updateGrid = (gridSquares: GridSquare[]) => {
        gridSquares.forEach((gridSquare:GridSquare) => {
            this.clearGrid(gridSquare);
            if (gridSquare.isEmpty()) return;
            this.renderGrid(gridSquare);
        })
    }
  
    clearGrid = (gridSquare: GridSquare) => {
        const canvasPosition = new CanvasPosition(gridSquare.getPosition());
        this.context.clearRect(canvasPosition.x, canvasPosition.y, 30, 30);
    }

    renderGrid = (gridSquare: GridSquare) => {
        const object = gridSquare.getCharacter();
        if (!object) {
            return;
        }
        const icon = object.icon;
        const canvasPosition = new CanvasPosition(gridSquare.getPosition());
        this.context.drawImage(icon.image, canvasPosition.x, canvasPosition.y, icon.width, icon.height);
        
    }
    
}