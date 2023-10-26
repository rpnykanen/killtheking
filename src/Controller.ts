
export default class Controller {

  private _move: CallableFunction; 

  private _shoot: CallableFunction;

  private _skip: CallableFunction;

  constructor() {
    document.addEventListener('keyup', this.handleAction)
  }

  private handleAction = (keyUp: KeyboardEvent) => {
    const key = keyUp.key;
    switch(key) {
      case 'ArrowLeft':
        this._move(true);
        break;
      case 'ArrowRight':
        this._move(false);
        break;
      case 'ArrowUp':
        this._shoot();
        break;
      case 'ArrowDown':
        this._skip();
        break;
    }
  }

  set move(move: (boolean: boolean) => void) {this._move = move;}

  set shoot(shoot: () => void) { this._shoot = shoot; }

  set skip(skip: () => void) { this._skip = skip; }

}