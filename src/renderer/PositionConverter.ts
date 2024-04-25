import { GridOptions } from "../types/Configurations";
import CanvasPosition from "./CanvasPosition";

/**
 * Convert grid position to canvas position.
 */
export default class PositionConverter {
  constructor(private gridOptions: GridOptions) {
  }

  public map = (x: number,y: number, icon: HTMLImageElement | null): CanvasPosition => {
    
    const gridPaddingX = icon ? (this.gridOptions.gridSquareWidth - this.gridOptions.iconWidth) / 2 : 0;
    const gridPaddingY = icon ? (this.gridOptions.gridSquareHeight - this.gridOptions.iconHeight) / 2 : 0;

    const canvasX = x * this.gridOptions.gridSquareWidth 
    const canvasY = y * this.gridOptions.gridSquareHeight 
    
    const centerX = (x * this.gridOptions.gridSquareWidth) + (this.gridOptions.gridSquareWidth / 2);
    const centerY = (y * this.gridOptions.gridSquareHeight) + (this.gridOptions.gridSquareHeight / 2);
    
    return new CanvasPosition(canvasX,canvasY, gridPaddingX, gridPaddingY, centerX, centerY, icon); 
  }
}