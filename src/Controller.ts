import { Controls } from "./types/Options";

export default class Controller {

  private _move: CallableFunction; 

  private _shoot: CallableFunction;

  private _skip: CallableFunction;

  constructor(private readonly controls: Controls) {
    document.addEventListener('keyup', this.handleAction)
  }

  private handleAction = (keyUp: KeyboardEvent) => {
    const key = keyUp.key;
    switch(key) {
      case this.controls.left:
        this._move(true);
        break;
      case this.controls.right:
        this._move(false);
        break;
      case this.controls.shoot:
        this._shoot();
        break;
      case this.controls.skip:
        this._skip();
        break;
    }
  }

  set move(move: (boolean: boolean) => void) { this._move = move; }

  set shoot(shoot: () => void) { this._shoot = shoot; }

  set skip(skip: () => void) { this._skip = skip; }

}