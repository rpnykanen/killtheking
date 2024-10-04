export default class Button {

  private x: number;
  private y: number;

  private width: number;
  private height: number;

  constructor(private text: string, private context: CanvasRenderingContext2D) {
  }

  public setPosition = (x: number, y: number) => {
    this.x = x;
    this.y = y;
  }
  
  public setSize = (w: number, h: number) => {
    this.width = w;
    this.height = h;
  }

  public draw = () => {
    this.context.fillStyle = 'rgb(255, 255, 255)';
    this.context.fillRect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = 'rgb(0, 0, 0)';
    this.context.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2, this.width);
  }

  public inBounds (mouseX: number, mouseY: number): boolean {
    return (mouseX > this.x && mouseX < (this.x + this.width)) && 
           (mouseY > this.y && mouseY < (this.y + this.height))
  }

}