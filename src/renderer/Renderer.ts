import CanvasPosition from "./CanvasPosition.js";
import GridToCanvasPositionMapper from "./GridToCanvasPositionMapper.js";
import Effect from "./effect/Effect.js";
import EnemyDeathEvent from "../event/events/EnemyDeathEvent.js";
import GameUpdateEvent from "../event/events/GameUpdateEvent.js";
import Grid from "./grid/Grid.js"
import GridSquare from "../board/GridSquare.js";
import pubsub from "../event/PubSub.js";


export default class Renderer {

  constructor(
    private grid: Grid,
    private effect: Effect,
    private PositionMapper: GridToCanvasPositionMapper
  ) {}

  initialize = () : void => {
    this.handleEvents();
    this.grid.initialize();
  }

  private handleEvents = () : void => {
    pubsub.subscribe(GameUpdateEvent.EVENTNAME, this.updateGrid)
    pubsub.subscribe(EnemyDeathEvent.EVENTNAME, this.addEffect);
  }

  private addEffect = (event: EnemyDeathEvent) : void => {
    const canvasPosition = this.PositionMapper.map(event.x, event.y, null);
    this.effect.addAnimation(canvasPosition, 'explosion');
  }

  private updateGrid = (gameUpdateEvent: GameUpdateEvent) : void => {
      // Clear all empty squares.
      gameUpdateEvent.gridSquares
        .filter((gridSquare: GridSquare) => gridSquare.isEmpty())
        .map((gridSquare: GridSquare): CanvasPosition => this.PositionMapper.map(gridSquare.x, gridSquare.y, gridSquare.icon))
        .forEach((canvasPosition: CanvasPosition)=>this.grid.clearPosition(canvasPosition));

      // Render all grids with icon in it.
      gameUpdateEvent.gridSquares
        .filter((gridSquare: GridSquare) => !gridSquare.isEmpty())
        .map((gridSquare: GridSquare): CanvasPosition => this.PositionMapper.map(gridSquare.x, gridSquare.y, gridSquare.icon))
        .forEach((canvasPosition: CanvasPosition) => this.grid.renderIcon(canvasPosition));
  }

}