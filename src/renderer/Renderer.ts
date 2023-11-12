import pubsub from "../event/PubSub.js";
import EnemyDeathEvent from "../event/events/EnemyDeathEvent.js";
import GameUpdateEvent from "../event/events/GameUpdateEvent.js";
import GridSquare from "../grid/GridSquare.js";
import CanvasPosition from "./CanvasPosition.js";
import CanvasPositionMapper from "./CanvasPositionMapper.js";
import Effect from "./effect/Effect.js";
import Grid from "./grid/Grid.js"

export default class Renderer {

  constructor(
    private grid: Grid,
    private effect: Effect,
    private canvasPositionMapper: CanvasPositionMapper
  ) {}

  initialize = () => {
    this.handleEvents();
    this.grid.initialize();
  }

  private handleEvents = () : void => {
    pubsub.subscribe(GameUpdateEvent.EVENTNAME, this.updateGrid)
    pubsub.subscribe(EnemyDeathEvent.EVENTNAME, this.addEffect);
  }

  private addEffect = (event: EnemyDeathEvent) => {
    const canvasPosition = this.canvasPositionMapper.map(event.x, event.y, null);
    this.effect.addAnimation(canvasPosition, 'explosion');
  }

  private updateGrid = (gameUpdateEvent: GameUpdateEvent) : void => {
    const clearCanvasPositions = gameUpdateEvent.gridSquares.filter((gridSquare: GridSquare) => gridSquare.isEmpty())
      .map((gridSquare: GridSquare): CanvasPosition => this.canvasPositionMapper.map(gridSquare.x, gridSquare.y, gridSquare.icon));

    const renderCanvasPositions = gameUpdateEvent.gridSquares.filter((gridSquare: GridSquare) => !gridSquare.isEmpty())
      .map((gridSquare: GridSquare): CanvasPosition => this.canvasPositionMapper.map(gridSquare.x, gridSquare.y, gridSquare.icon));

    clearCanvasPositions && this.grid.clearPosition(clearCanvasPositions);
    renderCanvasPositions && this.grid.renderIcon(renderCanvasPositions);
  }

}