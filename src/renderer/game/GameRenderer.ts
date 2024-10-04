import CanvasPosition from "@renderer/game/CanvasPosition";
import PositionConverter from "./PositionConverter";
import Effect from "./effect/Effect";
import EnemyDeathEvent from "../../event/events/EnemyDeathEvent";
import GameUpdateEvent from "../../event/events/GameUpdateEvent";
import Grid from "./grid/Grid"
import GridSquare from "../../board/GridSquare";
import EventManager from "@event/EventManager";
import Renderer from "@renderer/Renderer";
import CanvasFactory from "@renderer/CanvasFactory";


export default class GameRenderer extends Renderer {


  constructor(
    protected canvasFactory: CanvasFactory,
    private grid: Grid,
    private effect: Effect,
    private positionConverter: PositionConverter,
    private eventManager: EventManager
  ) {
    super(canvasFactory);
  }

  public initialize = () : void => {
    this.eventManager.subscribe(GameUpdateEvent.EVENTNAME, this.updateGrid)
    this.eventManager.subscribe(EnemyDeathEvent.EVENTNAME, this.addEffect);
    this.draw();
  }

  protected draw(): void {
    this.grid.initialize();
    this.effect.draw();
  }

  protected destroy(): void {
    throw new Error("Method not implemented.");
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