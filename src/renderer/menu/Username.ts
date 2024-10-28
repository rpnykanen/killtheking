export class UsernameLetterButton {
  private letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.,";

  private x: number;

  private y: number;

  private width = 20;

  private height = 20;

  private letterIndex: number | null = null;

  constructor(private context: CanvasRenderingContext2D) { }

  public setPosition = (_x: number, _y: number): void => {
    this.x = _x;
    this.y = _y;
  }

  public addIndex = (): void => {
    if (this.letterIndex === null) {
      this.letterIndex = 0;
    } else {
      this.letterIndex = this.letterIndex < this.letters.length ? this.letterIndex + 1 : null;
    }
    this.draw();
  }

  public inBounds = (mouseX: number, mouseY: number): boolean =>
    (mouseX > this.x && mouseX < (this.x + this.width+10)) && (mouseY > this.y && mouseY < (this.y + this.height+10));

  public draw = (): void => {
    this.context.fillStyle = 'rgb(150,150, 150)';
    this.context.fillRect(this.x, this.y, 30, 30);
    this.letter();
  }

  public letter = (): void => {
    this.context.fillStyle = 'rgb(255,255,255)';
    this.letterIndex != null && this.context.fillText(this.letters[this.letterIndex], this.x+15, this.y+17);
  }
}

export default class Username {
  private x: number;

  private y: number;

  private usernameButtons: UsernameLetterButton[] = [];

  constructor(private context: CanvasRenderingContext2D) {}

  public setPosition = (x: number, y: number): void => {
    this.x = x;
    this.y = y;
    this.context.fillText('Player: ', this.x, this.y);
  }

  public createLetters = (): void => {
    for (let i = 1; i <= 6; i++) {
      const z = new UsernameLetterButton(this.context);
      const x = this.x+5 + (i*35);
      const y = this.y-15;
      z.setPosition(x,y);
      this.usernameButtons.push(z);
    } 
  }

  public draw = () => this.usernameButtons.forEach((button:UsernameLetterButton)=> button.draw());

  public buttonClick = (x: number, y: number): UsernameLetterButton | null => {
    const button = this.usernameButtons.find((button:UsernameLetterButton)=> button.inBounds(x,y)) ?? null;
    button && button.addIndex();
    this.draw();
    return button;
  }
}