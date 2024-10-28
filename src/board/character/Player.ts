import Character from "./Character";
import Position from "../Position";

export default class Player extends Character {
  constructor() {
    super();
    this._icon = document.getElementById('player') as HTMLImageElement;
    this._position = new Position(0, 15);
  }

  // TODO: bad leftarrow.
  public updatePosition = (action: string) => {
    let x = this._position.x;
    if (action == 'ArrowLeft') {
      x -= this._position.x > 0 ? 1 : 0;
    } else {
      x += this._position.x < 9 ? 1 : 0;
    }
    this._position = new Position(x, this._position.y);
  }

  set position(position: Position) { this._position = position; }

  get position(): Position { return this._position; }
}