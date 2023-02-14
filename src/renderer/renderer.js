import { gridCoordinateToPosition } from "./helper.js";

export default class Renderer {

    // Box width
    static bw = 400;
    // Box height
    static bh = 600;
    // Padding
    static p = 10;

    constructor(grid){
        this.context = document.getElementById("game").getContext("2d");
        this.context.font='14px FontAwesome';
        this.grid = grid;
    }

    drawGrid = () => {
        const p = Renderer.p;
        const bw = Renderer.bw
        const bh = Renderer.bh

        for (let x = 0; x <= bw; x += 40) {
            this.context.moveTo(0.5 + x + p, p);
            this.context.lineTo(0.5 + x + p, bh + p);
        }
        for (let x = 0; x <= bh; x += 40) {
            this.context.moveTo(p, 0.5 + x + p);
            this.context.lineTo(bw + p, 0.5 + x + p);
        }
    
        this.context.strokeStyle = "black";
        this.context.stroke();
    }

    updateGrid = (gridSquare) => {
        const {posX,posY} = gridCoordinateToPosition(...Object.values(gridSquare.getPosition()));
        this.context.beginPath();
        this.context.clearRect(posX, posY, 30,30);
        
        if (gridSquare.isEmpty()) return;
        const object = gridSquare.getObject();
        const {width, height} = object.getIconSize();
        this.context.beginPath();
        this.context.drawImage(object.getIcon(), posX, posY, width, height);
    }

}