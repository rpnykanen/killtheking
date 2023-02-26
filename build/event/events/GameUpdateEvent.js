export default class GameUpdateEvent {
    constructor(gridSquares) {
        this.gridSquares = gridSquares;
        this.getGridSquares = () => this.gridSquares;
    }
}
GameUpdateEvent.eventName = 'game.update';
GameUpdateEvent.create = (gridSquares) => {
    return new GameUpdateEvent(gridSquares);
};
