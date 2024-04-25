import { GridConfiguration } from "../types/Configurations";
import CanvasPosition from "./CanvasPosition";

/**
 * Convert grid position to canvas position.
 */
export default class PositionConverter {
  constructor(private gridConfiguration: GridConfiguration) {
  }

  public map = (x: number,y: number, icon: HTMLImageElement | null): CanvasPosition => {
    
    const gridPaddingX = icon ? (this.gridConfiguration.gridSquareWidth - this.gridConfiguration.iconWidth) / 2 : 0;
    const gridPaddingY = icon ? (this.gridConfiguration.gridSquareHeight - this.gridConfiguration.iconHeight) / 2 : 0;

    const canvasX = x * this.gridConfiguration.gridSquareWidth 
    const canvasY = y * this.gridConfiguration.gridSquareHeight 
    
    const centerX = (x * this.gridConfiguration.gridSquareWidth) + (this.gridConfiguration.gridSquareWidth / 2);
    const centerY = (y * this.gridConfiguration.gridSquareHeight) + (this.gridConfiguration.gridSquareHeight / 2);
    
    return new CanvasPosition(canvasX,canvasY, gridPaddingX, gridPaddingY, centerX, centerY, icon); 
  }
}