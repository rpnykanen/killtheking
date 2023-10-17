import Character from "./Character.js";
import Icon from "./Icon.js";
import Position from "../grid/Position.js";

export default class Player extends Character {
    constructor() {
        super();
        this._icon = new Icon(30, 30, '../../images/player.svg');
        this._position = new Position(0,15);
    }

    public updatePosition = (action: string) => {
        this._oldPosition = this._position.clone();
        let x = this._position.x;
        if (action == 'ArrowLeft') {
            x -= this._position.x > 0 ? 1 : 0;
        } else {
            x += this._position.x < 9 ? 1 : 0;
        }
        this._position = new Position(x, this._position.y);
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