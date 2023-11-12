export default class GameOverEvent {
    constructor() { this.endTime = Date.now(); }
    get getEndTime() { return this.endTime; }
    get eventName() {
        return GameOverEvent.EVENTNAME;
    }
}
GameOverEvent.EVENTNAME = 'game.over';
