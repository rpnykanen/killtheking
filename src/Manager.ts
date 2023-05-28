import EnemyDeathEvent from "./event/events/EnemyDeathEvent.js";
import GameUpdateEvent from "./event/events/GameUpdateEvent.js";
import PlayerShootEvent from "./event/events/PlayerShootEvent.js";
import pubsub from "./event/PubSub.js";
import RoundSkipEvent from "./event/events/RoundSkipEvent.js";


class Manager {

    private instance: Manager | null;

    private roundLength: number;
    private roundStatus: number;
    private gameActive: boolean;
    private score: number;
    private killed: number;
    private timebank: number;

    constructor() {
        if (this.instance) {
            throw new Error("New instance cannot be created!");
          }
        this.instance = this;

        this.roundLength = 500;
        this.roundStatus = 0;
        this.gameActive = true;
        this.score = 0;
        this.killed = 0;
        pubsub.subscribe(GameUpdateEvent.EVENTNAME, this.resetCounter);
        pubsub.subscribe(EnemyDeathEvent.EVENTNAME, this.addScore);
        this.loop();
    }

    resetCounter = () => {
        this.score -= (this.roundStatus/100);
        this.roundStatus = 0;
        console.log('minus',(this.roundStatus/100));
    }

    addScore = (death: EnemyDeathEvent) => {
        this.killed +=1;
        const baseScore = death.enemy.score;
        this.score += this.roundStatus < 500 ? baseScore * ((this.roundLength-this.roundStatus)/100) : baseScore;
        console.log('score',this.score);
    }

    loop = (): void => {
        if (this.gameActive) {
            if (this.roundStatus >= this.roundLength && this.timebank > 0) {
                this.roundStatus = 0;
                console.log('skipped by manager');
                pubsub.publish(RoundSkipEvent.create());
            }
            this.roundStatus += 5;
            requestAnimationFrame(this.loop);
        }
    }

}

export default new Manager()
