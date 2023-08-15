export default class GameRestartEvent implements IEvent {
    static EVENTNAME: string = 'game.restart';

    static create = () => new GameRestartEvent();

    get eventName() { return GameRestartEvent.EVENTNAME; }
}