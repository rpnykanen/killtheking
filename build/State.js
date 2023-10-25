import EnemyDeathEvent from "./event/events/EnemyDeathEvent.js";
import GameUpdateEvent from "./event/events/GameUpdateEvent.js";
import pubsub from "./event/PubSub.js";
import GameActionEvent from "./event/events/GameActionEvent.js";
export default class State {
    constructor() {
        this.kills = 0;
        this.actions = 0;
        this._boss = false;
        this.initialize = () => {
            this.roundLength = 500;
            this.roundCurrentLength = 0;
            this.gameActive = false;
            this.start();
            this.requestId = undefined;
        };
        this.action = (gameActionEvent) => {
            this.actions += 1;
            this.roundCurrentLength = 0;
            const actionMillisecond = (((gameActionEvent.currentTime - this.startTime) / this.actions) / 1000);
        };
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
            const score = (((this.endTime - this.startTime) / this.actions));
            alert(`Game ended. score: ${score}`);
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
        this.isActive = () => {
            return this.gameActive;
        };
        this.loop = () => {
            if (!this.gameActive)
                return;
            requestAnimationFrame(this.loop);
        };
        pubsub.subscribe(GameUpdateEvent.EVENTNAME, this.resetCounter);
        pubsub.subscribe(EnemyDeathEvent.EVENTNAME, this.addKills);
        pubsub.subscribe(GameActionEvent.EVENTNAME, this.action);
    }
    set boss(boss) {
        this._boss = boss;
    }
    get boss() {
        return this._boss;
    }
}
