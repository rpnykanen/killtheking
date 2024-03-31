import Character from "@board/character/Character";
import Icon from "../board/character/Icon";

export default class CanvasPosition {
  constructor(
    private _canvasX: number, 
    private _canvasY: number,
    private _centerX: number,
    private _centerY: number,
    private _icon: HTMLImageElement | null,
  ) {
  }
    public isEmpty = (): boolean => { return this.icon === null }
    get icon() { return this._icon }

    get iconPositionX(): number { return this._canvasX }
    get iconPositionY(): number { return this._canvasY }
    
    get centerX(): number { return this._centerX }
    get centerY(): number { return this._centerY }
}