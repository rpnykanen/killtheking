import pubsub from "../event/PubSub.js";
import GameUpdateEvent from "../event/events/GameUpdateEvent.js";
import PlayerShootEvent from "../event/events/PlayerShootEvent.js";
import RoundSkipEvent from "../event/events/RoundSkipEvent.js";

export default class Manager {

    private roundLength: number;
    private roundStatus: number;
    private gameActive: boolean;
    private score = 0;

    constructor() {
        this.roundLength = 500;
        this.roundStatus = 0;
        this.gameActive = true;
        this.score = 0;
        pubsub.subscribe(GameUpdateEvent.EVENTNAME, this.reset);
    }

    reset = () => {
        this.roundStatus = 0;
    }

    update = (): void => {
        //pubsub.publish(RoundSkipEvent.eventName, RoundSkipEvent.create());
        this.reset();
    }

    loop = (): void => {
        if (this.gameActive) {
            if (this.roundStatus >= this.roundLength) {
                this.roundStatus = 0;
                pubsub.publish(RoundSkipEvent.create());
                return;
            }
            this.roundStatus += 10;
            requestAnimationFrame(this.loop);
        }
    }

}