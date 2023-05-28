import EnemyDeathEvent from "./event/events/EnemyDeathEvent.js";
import GameUpdateEvent from "./event/events/GameUpdateEvent.js";
import pubsub from "./event/PubSub.js";
import RoundSkipEvent from "./event/events/RoundSkipEvent.js";
class Manager {
    constructor() {
        this.resetCounter = () => {
            this.score -= (this.roundStatus / 100);
            this.roundStatus = 0;
            console.log('minus', (this.roundStatus / 100));
        };
        this.addScore = (death) => {
            this.killed += 1;
            const baseScore = death.enemy.score;
            this.score += this.roundStatus < 500 ? baseScore * ((this.roundLength - this.roundStatus) / 100) : baseScore;
            console.log('score', this.score);
        };
        this.loop = () => {
            if (this.gameActive) {
                if (this.roundStatus >= this.roundLength && this.timebank > 0) {
                    this.roundStatus = 0;
                    console.log('skipped by manager');
                    pubsub.publish(RoundSkipEvent.create());
                }
                this.roundStatus += 5;
                requestAnimationFrame(this.loop);
            }
        };
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
}
export default new Manager();
