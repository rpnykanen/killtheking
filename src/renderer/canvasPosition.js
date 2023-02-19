export default class CanvasPosition {

    constructor(x,y, isPosition){
        this.originalX = x;
        this.originalY = y;
        if (!isPosition) {
            this.x = x;
            this.y = y;
        } else {
            this.x = x*40+20;
            this.y = y*40+15;
        }
    }

    getX = () => this.x;
    getY = () => this.y;

    addX = (x) => this.x += x;
    addY = (y) => this.y += y;

    substractX = (x) => this.x -= x;
    substractY = (y) => this.x -= y;

    equals = (canvasPosition) => canvasPosition.getX() === this.x && canvasPosition.getY() === this.y;

    clone = () => new CanvasPosition(this.x, this.y, false);

}