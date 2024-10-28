import Character from "@board/character/Character";

export default class Item {
  private _ttl = 800;

  constructor(
    private _x: number,
    private _y: number,
    private character: Character,
  ) {
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get alpha() {
    return this._alpha;
  }

  get icon() {
    return this.character.icon;
  }

  get width() {
    return 50;
  }

  get height() {
    return 50;
  }

  update = () => {
    this._y -= 0.75;
    this._ttl -= 1;
  }

  isDead = () => this._ttl <= 0;
}