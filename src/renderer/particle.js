import CanvasPosition from "./canvasPosition.js";

export default class Particle {
    constructor(position, context) {
        this.position = position;
        this.context = context;
        this.canvasPosition = new CanvasPosition(this.position.getX(), this.position.getY(), true);
        this.oldCanvasPosition = null;

        this.context.beginPath();
        this.context.arc(this.canvasPosition.getX(), this.canvasPosition.getY(), 10, 0, 2 * Math.PI, false);
    }

    update = () => {
        this.canvasPosition.addX(2);
        this.canvasPosition.addY(2);
        
        if (this.oldCanvasPosition) {
            console.log('o',this.oldCanvasPosition);
            this.context.beginPath();
            this.context.clearRect(this.oldCanvasPosition.getX(), this.oldCanvasPosition.getY(), 10, 10);
            this.oldCanvasPosition.addX(2);
            this.oldCanvasPosition.addY(2);
        }
        //this.oldCanvasPosition = this.canvasPosition;
        this.context.beginPath();
        //this.context.arc(this.canvasPosition.getX(), this.canvasPosition.getY(), 30, 0, 2 * Math.PI, false);
        //console.log(this.canvasPosition.getX(), this.canvasPosition.getY())
        this.context.arc(this.canvasPosition.getX(), this.canvasPosition.getY(), 1, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'black';
        this.context.fill();
        this.context.stroke();
        if (!this.oldCanvasPosition) {
            //this.oldCanvasPosition = this.canvasPosition.clone();
            console.log('xxx',this.canvasPosition, this.oldCanvasPosition);
        }
        // this.context.beginPath();
        // this.context.clearRect(posX, posY, 30,30);
    }
}