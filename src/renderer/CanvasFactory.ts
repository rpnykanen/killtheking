import ConfigurationManager from "../ConfigurationManager";
import { GridConfiguration } from "../types/Configurations";

export default class CanvasFactory {
  private gridConfiguration: GridConfiguration;

  private canvases: HTMLCanvasElement[] = [];

  constructor(private configuration: ConfigurationManager) {
    this.gridConfiguration = this.configuration.getGridConfigurations();
  }

  // Todo read canvas.
  createCanvas = (name: string): HTMLCanvasElement => {
    const canvas: HTMLCanvasElement = document.createElement("canvas");

    canvas.style.position = 'absolute';
    canvas.style.top = '100px';
    canvas.style.left = '10px';

    canvas.id = name;
    
    this.canvases.push(canvas);

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const canvasPadding = 10;
    context.canvas.width = (this.gridConfiguration.width * this.gridConfiguration.gridSquareWidth + (2 * canvasPadding));
    context.canvas.height = (this.gridConfiguration.height * this.gridConfiguration.gridSquareHeight + 100);

    return canvas;
  }
}