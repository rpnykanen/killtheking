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

    // TODO: clenaup
    toCanvasPosition = () => {
        const x = this.x*40+30
        const y = this.y*40+30;
        return {x,y};
    }

    equals = (position) => position.getX() === this.x && position.getY() === this.y;

    clone = () => new Position(this.x, this.y);

}