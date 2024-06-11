import CanvasPosition from "./CanvasPosition";
import PositionConverter from "./PositionConverter";
import Effect from "./effect/Effect";
import EnemyDeathEvent from "../event/events/EnemyDeathEvent";
import GameUpdateEvent from "../event/events/GameUpdateEvent";
import Grid from "./grid/Grid"
import GridSquare from "../board/GridSquare";
import EventManager from "@event/EventManager";


export default class Renderer {
  constructor(
    private grid: Grid,
    private effect: Effect,
    private positionConverter: PositionConverter,
    private eventManager: EventManager
  ) {}

  public initialize = () : void => {
    this.eventManager.subscribe(GameUpdateEvent.EVENTNAME, this.updateGrid)
    this.eventManager.subscribe(EnemyDeathEvent.EVENTNAME, this.addEffect);
    this.grid.initialize();
    this.effect.draw();
  }

  public end = () => this.grid.clearCanvas();

  private addEffect = (event: EnemyDeathEvent) : void => {
    const canvasPosition = this.positionConverter.map(event.x, event.y, null);
    this.effect.addAnimation(canvasPosition, 'explosion');
  }

  private updateGrid = (gameUpdateEvent: GameUpdateEvent) : void => {
    this.clearEmptySquares(gameUpdateEvent.gridSquares);
    this.renderSquares(gameUpdateEvent.gridSquares);
  }

  private clearEmptySquares = (gridSquares: GridSquare[]): void => {
    gridSquares.filter((gridSquare: GridSquare) => gridSquare.isEmpty())
      .map((gridSquare: GridSquare): CanvasPosition => this.positionConverter.map(gridSquare.x, gridSquare.y, gridSquare.icon))
      .forEach((canvasPosition: CanvasPosition)=>this.grid.clearPosition(canvasPosition));
  }

  private renderSquares = (gridSquares: GridSquare[]): void => {
    gridSquares.filter((gridSquare: GridSquare) => !gridSquare.isEmpty())
      .map((gridSquare: GridSquare): CanvasPosition => this.positionConverter.map(gridSquare.x, gridSquare.y, gridSquare.icon))
      .forEach((canvasPosition: CanvasPosition) => this.grid.renderIcon(canvasPosition));
  }

}