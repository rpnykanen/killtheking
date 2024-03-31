import Icon from "./Icon";
import Position from "../Position";

export default class Character {
  protected _position: Position;
  protected _icon: HTMLImageElement;

  get position(): Position {
    return this._position;
  }

  get icon(): HTMLImageElement {
    return this._icon;
  }
}