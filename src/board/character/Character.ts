import Icon from "./Icon";
import Position from "../Position";

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