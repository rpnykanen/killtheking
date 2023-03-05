import pubsub from "../event/PubSub.js";
import GameUpdateEvent from "../event/events/GameUpdateEvent.js";
import RoundSkipEvent from "../event/events/RoundSkipEvent.js";
export default class Manager {
    constructor() {
        this.score = 0;
        this.reset = () => {
            this.roundStatus = 0;
        };
        this.update = () => {
            this.reset();
        };
        this.loop = () => {
            if (this.gameActive) {
                if (this.roundStatus >= this.roundLength) {
                    this.roundStatus = 0;
                    pubsub.publish(RoundSkipEvent.create());
                    return;
                }
                this.roundStatus += 10;
                requestAnimationFrame(this.loop);
            }
        };
        this.roundLength = 500;
        this.roundStatus = 0;
        this.gameActive = true;
        this.score = 0;
        pubsub.subscribe(GameUpdateEvent.EVENTNAME, this.reset);
    }
}
