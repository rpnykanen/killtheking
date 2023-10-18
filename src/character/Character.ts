import Position from "../grid/Position.js";
import Icon from "./Icon.js";

export default class Character {
    protected _position: Position;
    protected _icon: Icon;

    get position(): Position {
        return this._position;
    }

    get icon(): Icon {
        return this._icon;
    }
}