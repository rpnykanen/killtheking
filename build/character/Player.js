import Character from "./Character.js";
import Icon from "./Icon.js";
import Position from "../grid/Position.js";
export default class Player extends Character {
    constructor() {
        super();
        this.updatePosition = (action) => {
            let x = this._position.x;
            if (action == 'ArrowLeft') {
                x -= this._position.x > 0 ? 1 : 0;
            }
            else {
                x += this._position.x < 9 ? 1 : 0;
            }
            this._position = new Position(x, this._position.y);
        };
        this._icon = new Icon(30, 30, '../../images/player.svg');
        this._position = new Position(0, 15);
    }
    set position(position) {
        this._position = position;
    }
    get position() {
        return this._position;
    }
    get icon() {
        return this._icon;
    }
}
