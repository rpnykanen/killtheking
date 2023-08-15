import EnemyDeathEvent from "./event/events/EnemyDeathEvent.js";
import GameUpdateEvent from "./event/events/GameUpdateEvent.js";
import pubsub from "./event/PubSub.js";
export default class State {
    constructor() {
        this.kills = 0;
        this.start = () => {
            this.gameActive = true;
            if (!this.requestId) {
                this.requestId = requestAnimationFrame(this.loop);
            }
            this.startTime = Date.now();
        };
        this.end = () => {
            this.gameActive = false;
            cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
            this.endTime = Date.now();
        };
        this.resetCounter = () => {
            this.roundCurrentLength = 0;
        };
        this.addKills = () => {
            this.kills += 1;
        };
        this.getKills = () => {
            return this.kills;
        };
        this.loop = () => {
            if (!this.gameActive)
                return;
            this.roundCurrentLength += 5;
            requestAnimationFrame(this.loop);
        };
        pubsub.subscribe(GameUpdateEvent.EVENTNAME, this.resetCounter);
        pubsub.subscribe(EnemyDeathEvent.EVENTNAME, this.addKills);
        this.roundLength = 500;
        this.roundCurrentLength = 0;
        this.start();
        this.requestId = undefined;
    }
}
