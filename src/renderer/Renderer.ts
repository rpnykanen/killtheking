import CanvasPosition from "./CanvasPosition";
import GridToCanvasPositionMapper from "./GridToCanvasPositionMapper";
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
    private positionMapper: GridToCanvasPositionMapper,
    private eventManager: EventManager
  ) {}

  initialize = () : void => {
    this.update();
    this.grid.initialize();
  }

  private update = () : void => {
    this.eventManager.subscribe(GameUpdateEvent.EVENTNAME, this.rerenderGrid)
    this.eventManager.subscribe(EnemyDeathEvent.EVENTNAME, this.addEffect);
  }

  public addEffect = (event: EnemyDeathEvent) : void => {
    const canvasPosition = this.positionMapper.map(event.x, event.y, null);
    this.effect.addAnimation(canvasPosition, 'explosion');
  }

  public rerenderGrid = (gameUpdateEvent: GameUpdateEvent) : void => {
    // Clear all empty squares.
    gameUpdateEvent.gridSquares
      .filter((gridSquare: GridSquare) => gridSquare.isEmpty())
      .map((gridSquare: GridSquare): CanvasPosition => this.positionMapper.map(gridSquare.x, gridSquare.y, gridSquare.icon))
      .forEach((canvasPosition: CanvasPosition)=>this.grid.clearPosition(canvasPosition));

    // Render all grids with icon in it.
    gameUpdateEvent.gridSquares
      .filter((gridSquare: GridSquare) => !gridSquare.isEmpty())
      .map((gridSquare: GridSquare): CanvasPosition => this.positionMapper.map(gridSquare.x, gridSquare.y, gridSquare.icon, gridSquare))
      .forEach((canvasPosition: CanvasPosition) => this.grid.renderIcon(canvasPosition));
  }

}