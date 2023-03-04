export default class GameUpdateEvent {
    constructor(_gridSquares) {
        this._gridSquares = _gridSquares;
    }
    get gridSquares() { return this._gridSquares; }
}
GameUpdateEvent.eventName = 'game.update';
GameUpdateEvent.create = (gridSquares) => {
    return new GameUpdateEvent(gridSquares);
};
