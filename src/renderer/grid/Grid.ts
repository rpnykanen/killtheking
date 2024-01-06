import { GridOptions } from "../../types/Options";
import CanvasPosition from "../CanvasPosition";

export default class Grid {
 
  private canvasPadding: number; 
  private elementId: string;

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(private options: GridOptions) {
    this.canvasPadding = 10;
    this.canvas = document.createElement("canvas");
    this.canvas.id = options.gameCanvas;
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '100px';
    this.canvas.style.left = '10px';

    const context = this.canvas.getContext("2d");
    context && (this.context = context);
    this.context.canvas.width = this.options.width * this.options.gridSquareWidth + (2 * this.canvasPadding);
    this.context.canvas.height = this.options.height * this.options.gridSquareHeight + 100;
  }

  public initialize = (): void => {
    this.draw();
  }
  
  public clearCanvas = (): void => {
    this.context.clearRect(0, 0, 1000, 1000)
  }

  public clearPosition = (canvasPosition: CanvasPosition): void => {
    this.context.clearRect(
      canvasPosition.iconPositionX-1,
      canvasPosition.iconPositionY-1,
      this.options.gridSquareWidth-5,
      this.options.gridSquareHeight-2
    )
  }

  public renderIcon = (canvasPosition: CanvasPosition) => {
    const icon = canvasPosition.icon;
    icon && this.context.drawImage(
      icon.image,
      canvasPosition.iconPositionX,
      canvasPosition.iconPositionY,
      icon.width,
      icon.height
    );
  }

  private draw = () => {
    document.getElementById(this.options.elementId)?.append(this.canvas);

    const padding = 0;
    
    const width = this.options.width * this.options.gridSquareWidth;
    const height = this.options.height * this.options.gridSquareHeight;

    this.drawHorizontal(padding, width, height);
    this.drawVertital(padding, width, height);

    this.context.strokeStyle = "black";
    this.context?.stroke();
  }

  private drawHorizontal = (padding: number, width: number, height: number) => {
    for (let x = 0; x <= width; x += this.options.gridSquareWidth) {
      const xFrom = 0.5 + x + padding;
      const yFrom = padding;
      const xTo = 0.5 + x + padding;
      const yTo = height + padding;

      this.context?.moveTo(xFrom, yFrom);
      this.context?.lineTo(xTo, yTo);
    }
  }

  private drawVertital = (padding: number, width: number, height: number) => {
    for (let x = 0; x <= height; x += this.options.gridSquareHeight) {
      const xFrom = padding;
      const yFrom = 0.5 + x + padding;
      const xTo = width + padding;
      const yTo = 0.5 + x + padding;
      this.context?.moveTo(xFrom, yFrom);
      this.context?.lineTo(xTo, yTo);
    }
  }

}