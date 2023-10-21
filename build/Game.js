import GameActionEvent from './event/events/GameActionEvent.js';
import GameOverEvent from './event/events/GameOverEvent.js';
import pubsub from './event/PubSub.js';
export default class Game {
    constructor(grid, renderer, state) {
        this.grid = grid;
        this.renderer = renderer;
        this.state = state;
        this.handleAction = (keyName) => {
            if (!this.state.isActive()) {
                return;
            }
            this.grid.action(keyName);
            if (this.state.getKills() === 10 && this.state.boss === false) {
                this.grid.spawnBoss();
                this.state.boss = true;
            }
            pubsub.publish(new GameActionEvent());
        };
        this.startGame = () => {
            this.state.start();
        };
        this.endGame = () => {
            this.state.end();
            this.grid.end();
        };
        pubsub.subscribe(GameOverEvent.EVENTNAME, this.endGame);
    }
}
