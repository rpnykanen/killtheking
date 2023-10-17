export default class GameOverEvent implements IEvent {

    static EVENTNAME: string = 'game.over';

    private endTime: number;

    constructor() {
        this.endTime = Date.now();
    }

    get getEndTime() { return this.endTime; }

    get eventName(): string {
        return GameOverEvent.EVENTNAME;
    }
}