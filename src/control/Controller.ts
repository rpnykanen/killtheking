import { Controls } from "../types/Configurations";
import Control from "./Control";

/**
 * Map the user inputs and actions.
 */
export default class Controller extends Control {
  constructor(private readonly controls: Controls) {
    super();
    document.addEventListener('keyup', this.handleAction);
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