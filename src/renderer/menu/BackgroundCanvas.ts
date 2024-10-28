import CanvasFactory from "@renderer/CanvasFactory";
import { GridConfiguration } from "../../types/Configurations";
import BackgroundEffect from "@renderer/game/effect/effects/BackgroundEffect";
import Item from "@renderer/game/effect/effects/Item";

// TODO rewrite.
export default class BackgroundCanvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D

  constructor(
    private gridConfiguration: GridConfiguration,
    private canvasFactory: CanvasFactory,
    private backgroundEffect: BackgroundEffect,
  ) {
    this.canvas = this.canvasFactory.createCanvas('background');
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  public draw = () => {
    document.getElementById(this.gridConfiguration.elementId)?.append(this.canvas);
  }

  public update = () => {
    if (!this.backgroundEffect.isOn()) {
      return;
    }

    this.context.clearRect(0, 0, 1000, 1000);
    this.drawParticles();
  }

  public stopAnimation = () => {
    this.backgroundEffect.stop();
  }

  public destroy = () => {
    this.context.clearRect(0, 0, 1000, 1000);
    this.canvas.remove();
  }

  private drawParticles = () => {
    const items = this.backgroundEffect.update();
    this.context.globalAlpha = 0.05;
    items.forEach((item: Item): void => {
      this.context.drawImage(
        item.icon,
        item.x,
        item.y,
        25,
        25,
      );
    });
  }

}