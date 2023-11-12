export default class GameStartEvent {
    constructor() { this.startTime = Date.now(); }
    get getStartTime() { return this.startTime; }
    get eventName() {
        return GameStartEvent.EVENTNAME;
    }
}
GameStartEvent.EVENTNAME = 'game.start';
