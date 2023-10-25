
export default class Controller {

  private _move: CallableFunction; 

  private _shoot: CallableFunction;

  private _skip: CallableFunction;

  constructor() {
    document.addEventListener('keyup', this.handleAction)
  }

  private handleAction = (keyUp: KeyboardEvent) => {
    const key = keyUp.key;
    console
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

  setMove = (move: CallableFunction) => {
    this._move = move;
  }

  setShoot = (shoot: CallableFunction) => {
    this._shoot = shoot;
  }

  setSkip = (skip: CallableFunction) => {
    this._skip = skip;
  }

}