import pubsub from "../event/PubSub.js";
import Position from "../grid/Position.js";
import Character from "./Character.js";
import PlayerMoveEvent from "../event/events/PlayerMoveEvent.js";
import KeyboardEvent from "../event/events/KeyboardEvent.js";
import CharacterSpawnEvent from "../event/events/CharacterSpawnEvent.js";
import Icon from "./Icon.js";

export default class Player implements Character {
    protected _oldPosition: Position;
    protected _position: Position;
    protected _newPosition: Position;
    protected _health: number;
    
    protected _iconName: string;
    protected _iconHeight: number;
    protected _iconWidth: number;
    protected _icon: Icon;

    constructor() {
        this._icon = new Icon(30, 30, '../../images/player.svg');
        pubsub.subscribe(KeyboardEvent.eventName, this.action);
        this._position = new Position(0,14);
        pubsub.publish(CharacterSpawnEvent.eventName, CharacterSpawnEvent.create(this));
    }

    protected action = (action: string | null) => {
        if (action) {
            return;
        } 

        if (action == 'left' || action == 'right') {
            this._oldPosition = this._position.clone();
            let x = this._position.x;
            if (action == 'left') {
                x -= this._position.y > 0 ? 1 : 0;
                // this.position.substractX(x);
            } else {
                x += this._position.x < 9 ?  1 : 0;
                // this.position.addX(x);
            }
            this._position = new Position(x, this._position.y);
            
            pubsub.publish(PlayerMoveEvent.eventName, PlayerMoveEvent.create(this._oldPosition, this._position));
        }
        if (action == 'shoot') {
            pubsub.publish('player.shoot', this._position);
        }

        if (action == 'skip') {
            pubsub.publish('player.skip', {});
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