import Character from "./Character.js";
import Icon from "./Icon.js";
import PlayerMoveEvent from "../event/events/PlayerMoveEvent.js";
import Position from "../grid/Position.js";
import pubsub from "../event/PubSub.js";
export default class Player extends Character {
    constructor() {
        super();
        this.updatePosition = (action) => {
            this._oldPosition = this._position.clone();
            let x = this._position.x;
            if (action == 'ArrowLeft') {
                x -= this._position.x > 0 ? 1 : 0;
            }
            else {
                x += this._position.x < 9 ? 1 : 0;
            }
            this._position = new Position(x, this._position.y);
            pubsub.publish(PlayerMoveEvent.create(this._oldPosition, this._position));
        };
        this._icon = new Icon(30, 30, '../../images/player.svg');
        this._position = new Position(0, 15);
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
