export default class Particle {

  private _alpha;

  private _radius;

  constructor(
    private _x: number,
    private _y: number,
    private dx: number,
    private dy: number,
    private up: boolean,
    private right: boolean,
    private _ttl: number,
    radius?: number
  ) {
    this._alpha = 1.0;
    this._radius = radius ? radius : 1.5;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get radius() {
    return this._radius;
  }

  get alpha() {
    return this._alpha;
  }

  get ttl() {
    return this._ttl;
  }

  update = () => {
    this._x += this.right == true ? + -this.dx : this.dx;
    this._y += this.up == true ? + -this.dy : this.dy;
    this._ttl -= 10;
    // this._alpha -= 0.03;
  }


  isDead = () => this.ttl <= 0;
}