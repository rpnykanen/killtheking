import Container from './Container.js';
import GameOverEvent from './event/events/GameOverEvent.js';
import pubsub from './event/PubSub.js';
export default class Game {
    constructor() {
        this.initialize = () => {
            this.state.initialize();
            this.renderer.initialize();
            this.grid.initialize();
        };
        this.startGame = () => {
            this.state.start();
        };
        this.endGame = () => {
            this.state.end();
            this.grid.end();
        };
        this.container = new Container();
        this.state = this.container.state;
        this.renderer = this.container.renderer;
        this.grid = this.container.grid;
        pubsub.subscribe(GameOverEvent.EVENTNAME, this.endGame);
    }
}
