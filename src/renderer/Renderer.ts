import Position from "../grid/Position.js";
import GridPosition from "./CanvasPosition.js";
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

        //TODO: Sub to enemy death.

        this.drawGrid();
    }

    drawGrid = () => {
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
        
        this.context!.strokeStyle = "black";
        this.context?.stroke();
        
    }

    enemyDeath = (position: Position) => {
        this.effect.explosion(new GridPosition(position));
    }

    /*
    updateGrid = (gridSquare) => {
        this.clearGrid(gridSquare);
        if (gridSquare.isEmpty()) return;
        this.renderGrid(gridSquare);
    }
    */

    /*
    clearGrid = (gridSquare) => {
        const canvasPosition = new CanvasPosition(gridSquare.getPosition().getX(), gridSquare.getPosition().getY(), true);
        this.context.clearRect(canvasPosition.getX(), canvasPosition.getY(), 30, 30);
    }

    renderGrid = (gridSquare) => {
        const object = gridSquare.getObject();
        const {width, height} = object.getIconSize();
        const canvasPosition = new CanvasPosition(gridSquare.getPosition().getX(), gridSquare.getPosition().getY(), true);
        this.context.drawImage(object.getIcon(), canvasPosition.getX(), canvasPosition.getY(), width, height);
    }
    */
}