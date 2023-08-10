import EnemyDeathEvent from "./event/events/EnemyDeathEvent.js";
import GameUpdateEvent from "./event/events/GameUpdateEvent.js";
import PlayerShootEvent from "./event/events/PlayerShootEvent.js";
import pubsub from "./event/PubSub.js";
import RoundSkipEvent from "./event/events/RoundSkipEvent.js";

export default class State {

    private roundLength: number;
    private roundStatus: number;
    private gameActive: boolean;
    private score: number;
    private killed: number;
    private requestId: any;

    constructor() {      
        this.roundLength = 500;
        this.roundStatus = 0;
        this.score = 0;
        this.killed = 0;
        pubsub.subscribe(GameUpdateEvent.EVENTNAME, this.resetCounter);
        pubsub.subscribe(EnemyDeathEvent.EVENTNAME, this.addScore);
        this.start();
        this.requestId = undefined;
    }

    start = () => {
        this.gameActive = true;
        if (!this.requestId) {
            this.requestId = requestAnimationFrame(this.loop);
        }
    }

    stop = () => {
        this.gameActive = false;
        cancelAnimationFrame(this.requestId);
        this.requestId = undefined;
    }

    private resetCounter = () => {
        this.score -= (this.roundStatus/100);
        this.roundStatus = 0;
        console.log('minus',(this.roundStatus/100));
    }

    private addScore = (death: EnemyDeathEvent) => {
        this.killed += 1;
        const baseScore = death.enemy.score;
        // this.score += this.roundStatus < 500 ? baseScore * ((this.roundLength-this.roundStatus)/100) : baseScore;
        this.score = this.score += death.enemy.score;
        console.log('score',this.score);
    }

    private loop = (): void => {
        if (this.gameActive) {
            if (this.roundStatus >= this.roundLength) {
                this.roundStatus = 0;
                console.log('skipped by state manager');
                pubsub.publish(RoundSkipEvent.create());
            }
            this.roundStatus += 5;
            requestAnimationFrame(this.loop);
        }
    }
}
