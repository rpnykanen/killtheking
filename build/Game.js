import Player from './character/Player.js';
import pubsub from './event/PubSub.js';
import KeyboardEvent from './event/events/KeyboardEvent.js';
import Grid from "./grid/Grid.js";
import Renderer from "./renderer/Renderer.js";
export default class Game {
    constructor() {
        this.event = (keyName) => {
            pubsub.publish(KeyboardEvent.eventName, keyName);
        };
        this.grid = new Grid();
        this.renderer = new Renderer();
        this.player = new Player();
        this.grid.updateGrid();
    }
}
