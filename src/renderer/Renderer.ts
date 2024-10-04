import CanvasFactory from "./CanvasFactory";

export default abstract class Renderer {

  protected canvas: HTMLCanvasElement;

  protected context: CanvasRenderingContext2D;

  constructor(
    protected canvasFactory: CanvasFactory
  ) {
  }

  public abstract initialize(): void;

  protected abstract draw(): void;

  protected abstract destroy(): void;

}