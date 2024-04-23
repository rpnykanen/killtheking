export default abstract class Control {

  protected _move: CallableFunction; 

  protected _shoot: CallableFunction;

  protected _skip: CallableFunction;

  protected _reset : CallableFunction;

  public setupControls = (
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
}