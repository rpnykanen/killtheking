import pubsub from "../event/PubSub.js";
import EnemyDeathEvent from "../event/events/EnemyDeathEvent.js";
import GameUpdateEvent from "../event/events/GameUpdateEvent.js";
import GridSquare from "../grid/GridSquare.js";
import Position from "../grid/Position.js";
import CanvasPosition from "./CanvasPosition.js";
import Effect from "./effect/Effect.js";

export default class Renderer {

  static canvasWidth = 400;
  static canvasHeight = 600;
  static canvasPadding = 10;

  static gridSquareWidth = 40;

  private context: CanvasRenderingContext2D;

  private effect: Effect;

  constructor() {
    const canvas = <HTMLCanvasElement>document.getElementById("game");
    this.context = canvas.getContext("2d")!;
    const effectsCanvas = <HTMLCanvasElement>document.getElementById("effect");
    this.effect = new Effect(effectsCanvas.getContext("2d")!);
    this.drawGrid();

    pubsub.subscribe(GameUpdateEvent.EVENTNAME, this.updateGrid)
    pubsub.subscribe(EnemyDeathEvent.EVENTNAME, this.doExplode);
  }

  doExplode = (event: EnemyDeathEvent) => {
    const position = event.enemy.position;
    this.effect.explosion(new CanvasPosition(position));
  }

  drawGrid = () => {
    const padding = Renderer.canvasPadding;
    const width = Renderer.canvasWidth;
    const height = Renderer.canvasHeight;

    for (let x = 0; x <= width; x += Renderer.gridSquareWidth) {
      const xFrom = 0.5 + x + padding;
      const yFrom = padding;

      const xTo = 0.5 + x + padding;
      const yTo = height + padding;
      this.context?.moveTo(xFrom, yFrom);
      this.context?.lineTo(xTo, yTo);
    }
    for (let x = 0; x <= height; x += Renderer.gridSquareWidth) {
      const xFrom = padding;
      const yFrom = 0.5 + x + padding;
      const xTo = width + padding;
      const yTo = 0.5 + x + padding;
      this.context?.moveTo(xFrom, yFrom);
      this.context?.lineTo(xTo, yTo);
    }
    this.context!.strokeStyle = "black";
    this.context?.stroke();
  }

  enemyDeath = (position: Position) => {
    this.effect.explosion(new CanvasPosition(position));
  }

  updateGrid = (gameUpdateEvent: GameUpdateEvent) => {
    gameUpdateEvent.gridSquares.forEach((gridSquare: GridSquare) => {
      this.clearGridSquare(gridSquare);
      if (gridSquare.isEmpty()) return;
      this.renderGrid(gridSquare);
    })
  }

  clearGridSquare = (gridSquare: GridSquare) => {
    const canvasPosition = new CanvasPosition(gridSquare.position);
    this.context.clearRect(canvasPosition.x - 4, canvasPosition.y - 9, 39, 39);
  }

  clearGrid = () => {
    
  }

  renderGrid = (gridSquare: GridSquare) => {
    const object = gridSquare.character;
    const icon = object!.icon;
    const canvasPosition = new CanvasPosition(gridSquare.position);
    this.context.drawImage(icon.image, canvasPosition.x, canvasPosition.y - 5, icon.width, icon.height);
  }

}