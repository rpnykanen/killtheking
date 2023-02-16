export default class Position {

    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    getX = () => this.x
    getY = () => this.y

    addX = x => this.x += x;
    addY = y => this.y +=y;

    substractX = x => this.x -= x;
    substractY = x => this.y -= y;

    equals = (position) => position.getX() === this.x && position.getY() === this.y;

    clone = () => new Position(this.x, this.y);

}