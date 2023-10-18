import Position from "../grid/Position.js";
import Enemy from "./Enemy.js";
import Icon from "./Icon.js";
import King from "./King.js";
import Knight from "./Knight.js";
import Pawn from "./Pawn.js";
import Player from "./Player.js";

export default class CharacterFactory {

  public createRandomEnemy = (): Enemy => {
      return this.createPawn();
  }

  public createPawn = (): Pawn => {
    const health = 1;
    return new Pawn(new Position(1,1), 1);
  }

  public createKnight = (): Knight => {
    const health = 1;
    return new Knight(new Position(1,1), 1);
  }

  public createKing = (): King => {
    const health = 10;
    return new King(new Position(1,1), 1);
  }

  public createPlayer = (): Player => {
    return new Player();
  }

  protected _position: Position;
  protected _oldPosition: Position;
  protected _icon: Icon;

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