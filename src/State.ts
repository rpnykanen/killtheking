import EnemyDeathEvent from "./event/events/EnemyDeathEvent.js";
import GameUpdateEvent from "./event/events/GameUpdateEvent.js";
import PlayerShootEvent from "./event/events/PlayerShootEvent.js";
import pubsub from "./event/PubSub.js";
import RoundSkipEvent from "./event/events/RoundSkipEvent.js";

export default class State {

    private roundLength: number;
    private roundCurrentLength: number;
    private gameActive: boolean;
    private requestId: any;
    private startTime: number;
    private endTime: number;
    private kills = 0;

    constructor() {      
        pubsub.subscribe(GameUpdateEvent.EVENTNAME, this.resetCounter);
        pubsub.subscribe(EnemyDeathEvent.EVENTNAME, this.addKills);
        this.roundLength = 500;
        this.roundCurrentLength = 0;
        this.start();
        this.requestId = undefined;
        
    }

    start = () => {
        this.gameActive = true;
        if (!this.requestId) {
            this.requestId = requestAnimationFrame(this.loop);
        }
        this.startTime = Date.now();
    }

    end = () => {
        this.gameActive = false;
        cancelAnimationFrame(this.requestId);
        this.requestId = undefined;
        this.endTime = Date.now();
    }

    resetCounter = () => {
        this.roundCurrentLength = 0;
    }

    addKills = () => {
        this.kills += 1;
    }

    getKills = () => {
        return this.kills;
    }

    private loop = (): void => {
        if (!this.gameActive) return;
        /*
        if (this.roundCurrentLength >= this.roundLength) {
            this.roundCurrentLength = 0;
            pubsub.publish(RoundSkipEvent.create());
        }
        */
        this.roundCurrentLength += 5;
        requestAnimationFrame(this.loop);
    }
}
