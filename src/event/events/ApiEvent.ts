import IEvent from "@event/events/IEvent";
import {Highscore} from "../../api/Api";

export default class ApiEvent implements IEvent {
    static EVENTNAME = 'api.highscore';

    constructor(private _highscore: Highscore) {}

    get eventName(): string { return 'api.highscore' }

    get highscore(): Highscore { return this._highscore; }
}