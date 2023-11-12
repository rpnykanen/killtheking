import Icon from "../character/Icon.js";

export default class CanvasPosition {

  constructor(
    private _x: number, 
    private _y: number, 
    private _icon: Icon | null,
  ) {
  }
    public isEmpty = (): boolean => { return this.icon !== null }
    get icon(): Icon | null { return this._icon }

    get x(): number { return this._x }
    get y(): number { return this._y } 

    get iconPositionX(): number { return this._x }
    get iconPositionY(): number { return this._y -1 }

    get gridPositionX(): number { return this._x - 4 }
    get gridPositionY(): number { return this._y - 4 }

}