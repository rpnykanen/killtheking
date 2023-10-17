export default class GameActionEvent {
    constructor() {
        this._currentTime = 0;
        this._currentTime = Date.now();
    }
    get currentTime() {
        return this._currentTime;
    }
    get eventName() {
        return GameActionEvent.EVENTNAME;
    }
}
GameActionEvent.EVENTNAME = 'game.action';
