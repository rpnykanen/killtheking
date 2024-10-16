import Position from "../Position";

/**
 * Any item on board is character.
 */
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