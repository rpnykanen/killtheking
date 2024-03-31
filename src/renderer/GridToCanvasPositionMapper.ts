import GridSquare from "@board/GridSquare";
import Icon from "../board/character/Icon";
import { GridOptions } from "../types/Options";
import CanvasPosition from "./CanvasPosition";

/**
 * Turn grid position to canvas position.
 */
export default class GridToCanvasPositionMapper {

  private gridPaddingX: number;

  private gridPaddingY: number;

  constructor(private gridOptions: GridOptions) {
    this.gridPaddingX = (this.gridOptions.gridSquareWidth - this.gridOptions.iconWidth) / 2;
    this.gridPaddingY = (this.gridOptions.gridSquareHeight - this.gridOptions.iconHeight) / 2;
  }

  public map = (x: number,y: number, icon: HTMLImageElement | null): CanvasPosition => {
    const canvasX = (x * this.gridOptions.gridSquareWidth) + this.gridPaddingX;
    const canvasY = (y * this.gridOptions.gridSquareHeight) + this.gridPaddingY;
    const centerX = (x * this.gridOptions.gridSquareWidth) + (this.gridOptions.gridSquareWidth / 2);
    const centerY = (y * this.gridOptions.gridSquareHeight) + (this.gridOptions.gridSquareHeight / 2);
    return new CanvasPosition(canvasX,canvasY, centerX, centerY, icon); 
  }
}