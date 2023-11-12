export default class GameUpdateEvent {
    constructor(_gridSquares) {
        this._gridSquares = _gridSquares;
    }
    get gridSquares() { return this._gridSquares; }
    get eventName() { return GameUpdateEvent.EVENTNAME; }
}
GameUpdateEvent.EVENTNAME = 'game.update';
