import { Controls } from "../types/Options";
import Control from "./Control";

/**
 * Map the user inputs and actions.
 */
export default class Controller extends Control {

  private _move: CallableFunction; 

  private _shoot: CallableFunction;

  private _skip: CallableFunction;

  private _reset : CallableFunction;

  constructor(private readonly controls: Controls) {
    super();
    document.addEventListener('keyup', this.handleAction);
  }

  public setupPlayerControls = (
    move: (boolean: boolean) => void,
    shoot: () => void,
    skip: () => void,
    reset: () => void,
  ) => {
    this._move = move;
    this._shoot = shoot;
    this._skip = skip;
    this._reset = reset;
  }

  private handleAction = (keyUp: KeyboardEvent) => {
    const key = keyUp.code;
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
      case this.controls.reset:
        this._reset();
        break;
    }
  }

}