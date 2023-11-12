import pubsub from "../event/PubSub.js";
import EnemyDeathEvent from "../event/events/EnemyDeathEvent.js";
import GameUpdateEvent from "../event/events/GameUpdateEvent.js";
export default class Renderer {
    constructor(grid, effect, canvasPositionMapper) {
        this.grid = grid;
        this.effect = effect;
        this.canvasPositionMapper = canvasPositionMapper;
        this.initialize = () => {
            this.handleEvents();
            this.grid.initialize();
        };
        this.handleEvents = () => {
            pubsub.subscribe(GameUpdateEvent.EVENTNAME, this.updateGrid);
            pubsub.subscribe(EnemyDeathEvent.EVENTNAME, this.addEffect);
        };
        this.addEffect = (event) => {
            const canvasPosition = this.canvasPositionMapper.map(event.x, event.y, null);
            this.effect.addAnimation(canvasPosition, 'explosion');
        };
        this.updateGrid = (gameUpdateEvent) => {
            const clearCanvasPositions = gameUpdateEvent.gridSquares.filter((gridSquare) => gridSquare.isEmpty())
                .map((gridSquare) => this.canvasPositionMapper.map(gridSquare.x, gridSquare.y, gridSquare.icon));
            const renderCanvasPositions = gameUpdateEvent.gridSquares.filter((gridSquare) => !gridSquare.isEmpty())
                .map((gridSquare) => this.canvasPositionMapper.map(gridSquare.x, gridSquare.y, gridSquare.icon));
            clearCanvasPositions && this.grid.clearPosition(clearCanvasPositions);
            renderCanvasPositions && this.grid.renderIcon(renderCanvasPositions);
        };
    }
}
