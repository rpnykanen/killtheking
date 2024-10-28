import IEvent from "@event/events/IEvent";
import {Highscore} from "../../api/Api";

export default class ApiEvent implements IEvent {
    static EVENT_NAME = 'api.highscore';

    constructor(private _highscore: Highscore) {}

    get eventName(): string { return 'api.highscore' }

    get highscore(): Highscore { return this._highscore; }
}