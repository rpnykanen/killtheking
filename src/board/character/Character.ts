import Position from "../Position";

/**
 * Any item on board is character.
 */
export default abstract class Character {
  protected _position: Position;
  protected _icon: HTMLImageElement;

  // TODO: might be unnecessary to track here since grid already knows.
  get position(): Position { return this._position; }

  get icon(): HTMLImageElement { return this._icon; }
}