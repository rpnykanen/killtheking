import Icon from "./Icon.js";
import Position from "../board/Position.js";

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