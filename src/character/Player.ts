import Character from "./Character.js";
import CharacterSpawnEvent from "../event/events/CharacterSpawnEvent.js";
import Icon from "./Icon.js";
import KeyboardEvent from "../event/events/KeyboardEvent.js";
import PlayerMoveEvent from "../event/events/PlayerMoveEvent.js";
import PlayerShootEvent from "../event/events/PlayerShootEvent.js";
import Position from "../grid/Position.js";
import pubsub from "../event/PubSub.js";
import RoundSkipEvent from "../event/events/RoundSkipEvent.js";

export default class Player extends Character {
    protected _health: number;
    
    constructor() {
        super();
        this._icon = new Icon(30, 30, '../../images/player.svg');
        this._position = new Position(0,15);
        pubsub.subscribe(KeyboardEvent.EVENTNAME, this.action);
        pubsub.publish(CharacterSpawnEvent.create(this));
    }

    protected action = (event: KeyboardEvent) => {
        const action = event.event;
        if (action == 'left' || action == 'right') {
            this._oldPosition = this._position.clone();
            let x = this._position.x;
            if (action == 'left') {
                x -= this._position.x > 0 ? 1 : 0;
            } else {
                x += this._position.x < 9 ? 1 : 0;
            }
            this._position = new Position(x, this._position.y);
            pubsub.publish(PlayerMoveEvent.create(this._oldPosition, this._position));
        }
        if (action == 'shoot') {
            pubsub.publish(PlayerShootEvent.create(this._position));
        }
        if (action == 'skip') {
            pubsub.publish(RoundSkipEvent.create());
        }
    }

    get position(): Position {
        return this._position;
    }

    get oldPosition(): Position {
        return this._oldPosition;
    }

    get icon(): Icon {
        return this._icon;
    }

}