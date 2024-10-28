import CanvasFactory from "@renderer/CanvasFactory";
import { GridConfiguration } from "@type/Configurations";
import CanvasPosition from "@renderer/CanvasPosition";
import Renderer from "@renderer/Renderer";

export default class Grid extends Renderer {
  constructor(protected canvasFactory: CanvasFactory, private gridConfiguration: GridConfiguration) {
    super(canvasFactory);
  }

  public initialize = (): void => {
    this.canvas = this.canvasFactory.createCanvas('game');
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.draw();
  }

  public destroy(): void {
    this.canvas.remove();
  }
  
  public clearCanvas = (): void => {
    this.context.clearRect(0, 0, 1000, 1000)
  }

  public clearPosition = (canvasPosition: CanvasPosition): void => {
    // Must be smaller than gridsquare and away from the lines.
    this.context.clearRect(
      canvasPosition.iconPositionX+2,
      canvasPosition.iconPositionY+2,
      this.gridConfiguration.gridSquareWidth-3,
      this.gridConfiguration.gridSquareHeight-3
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

  protected draw = (): void => {
    document.getElementById(this.gridConfiguration.elementId)?.append(this.canvas);

    const width = this.gridConfiguration.width * this.gridConfiguration.gridSquareWidth;
    const height = this.gridConfiguration.height * this.gridConfiguration.gridSquareHeight;

    this.drawHorizontal(width, height);
    this.drawVertital(width, height);

    this.context.strokeStyle = "black";
    this.context?.stroke();
  }

  private drawHorizontal = (width: number, height: number): void => {
    for (let x = 0; x <= width; x += this.gridConfiguration.gridSquareWidth) {
      const xFrom = 0.5 + x;
      const yFrom = 0;
      const xTo = 0.5 + x;
      const yTo = height;

      this.context?.moveTo(xFrom, yFrom);
      this.context?.lineTo(xTo, yTo);
    }
  }

  private drawVertital = (width: number, height: number): void => {
    for (let x = 0; x <= height; x += this.gridConfiguration.gridSquareHeight) {
      const xFrom = 0;
      const yFrom = 0.5 + x;
      const xTo = width;
      const yTo = 0.5 + x;
      this.context?.moveTo(xFrom, yFrom);
      this.context?.lineTo(xTo, yTo);
    }
  }

}