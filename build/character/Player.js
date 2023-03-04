import pubsub from "../event/PubSub.js";
import Position from "../grid/Position.js";
import PlayerMoveEvent from "../event/events/PlayerMoveEvent.js";
import KeyboardEvent from "../event/events/KeyboardEvent.js";
import CharacterSpawnEvent from "../event/events/CharacterSpawnEvent.js";
import Icon from "./Icon.js";
import PlayerShootEvent from "../event/events/PlayerShootEvent.js";
export default class Player {
    constructor() {
        this.action = (action) => {
            if (action == 'ArrowLeft' || action == 'ArrowRight') {
                this._oldPosition = this._position.clone();
                let x = this._position.x;
                if (action == 'ArrowLeft') {
                    x -= this._position.x > 0 ? 1 : 0;
                }
                else {
                    x += this._position.x < 9 ? 1 : 0;
                }
                this._position = new Position(x, this._position.y);
                pubsub.publish(PlayerMoveEvent.eventName, PlayerMoveEvent.create(this._oldPosition, this._position));
            }
            if (action == 'ArrowUp') {
                pubsub.publish(PlayerShootEvent.eventName, PlayerShootEvent.create(this._position));
            }
            if (action == 'ArrowDown') {
                pubsub.publish('player.skip', {});
            }
        };
        this._icon = new Icon(30, 30, '../../images/player.svg');
        pubsub.subscribe(KeyboardEvent.eventName, this.action);
        this._position = new Position(0, 14);
        pubsub.publish(CharacterSpawnEvent.eventName, CharacterSpawnEvent.create(this));
    }
    get position() {
        return this._position;
    }
    get oldPosition() {
        return this._oldPosition;
    }
    get icon() {
        return this._icon;
    }
}
