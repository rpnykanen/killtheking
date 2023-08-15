export default class GameRestartEvent {
    get eventName() { return GameRestartEvent.EVENTNAME; }
}
GameRestartEvent.EVENTNAME = 'game.restart';
GameRestartEvent.create = () => new GameRestartEvent();
