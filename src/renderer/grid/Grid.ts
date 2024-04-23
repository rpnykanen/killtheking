import { GridOptions } from "../../types/Options";
import CanvasPosition from "../CanvasPosition";

export default class Grid {
 
  private canvasPadding: number; 
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(private options: GridOptions) {
    this.canvasPadding = 10;

    this.canvas = document.createElement("canvas");
    this.canvas.id = options.gameCanvas;

    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '100px';
    this.canvas.style.left = '10px';

    this.context = this.canvas.getContext("2d")!;
    this.context.canvas.width = (this.options.width * this.options.gridSquareWidth + (2 * this.canvasPadding));
    this.context.canvas.height = (this.options.height * this.options.gridSquareHeight + 100);
  }

  public initialize = (): void => {
    this.draw();
  }
  
  public clearCanvas = (): void => {
    this.context.clearRect(0, 0, 1000, 1000)
  }

  public clearPosition = (canvasPosition: CanvasPosition): void => {
    // Must be smaller than gridsquare and away from the lines.
    this.context.clearRect(
      canvasPosition.iconPositionX+2,
      canvasPosition.iconPositionY+2,
      this.options.gridSquareWidth-3,
      this.options.gridSquareHeight-3
    );
  }

  public renderIcon = (canvasPosition: CanvasPosition) => {
    const icon = canvasPosition?.icon
    icon && 
    this.context.drawImage(
      icon,
      canvasPosition.iconPositionXWithPadding,
      canvasPosition.iconPositionYWithPadding,
      icon.width,
      icon.height
    );
  }

  private draw = () => {
    document.getElementById(this.options.elementId)?.append(this.canvas);

    const width = this.options.width * this.options.gridSquareWidth;
    const height = this.options.height * this.options.gridSquareHeight;

    this.drawHorizontal(width, height);
    this.drawVertital(width, height);

    this.context.strokeStyle = "black";
    this.context?.stroke();
  }

  private drawHorizontal = (width: number, height: number) => {
    for (let x = 0; x <= width; x += this.options.gridSquareWidth) {
      const xFrom = 0.5 + x;
      const yFrom = 0;
      const xTo = 0.5 + x;
      const yTo = height;

      this.context?.moveTo(xFrom, yFrom);
      this.context?.lineTo(xTo, yTo);
    }
  }

  private drawVertital = (width: number, height: number) => {
    for (let x = 0; x <= height; x += this.options.gridSquareHeight) {
      const xFrom = 0;
      const yFrom = 0.5 + x;
      const xTo = width;
      const yTo = 0.5 + x;
      this.context?.moveTo(xFrom, yFrom);
      this.context?.lineTo(xTo, yTo);
    }
  }

}