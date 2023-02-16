export default class Renderer {

    static width = 400;
    static height = 600;
    static padding = 10;

    constructor(grid){
        this.context = document.getElementById("game").getContext("2d");
        this.context.font='14px FontAwesome';
        this.grid = grid;
    }

    drawGrid = () => {
        const padding = Renderer.padding;
        const width = Renderer.width
        const height = Renderer.height

        for (let x = 0; x <= width; x += 40) {
            this.context.moveTo(0.5 + x + padding, padding);
            this.context.lineTo(0.5 + x + padding, height + padding);
        }
        for (let x = 0; x <= height; x += 40) {
            this.context.moveTo(padding, 0.5 + x + padding);
            this.context.lineTo(width + padding, 0.5 + x + padding);
        }
    
        this.context.strokeStyle = "black";
        this.context.stroke();
    }

    updateGrid = (gridSquare) => {
        const {posX,posY} = this.gridCoordinateToPosition(gridSquare.getPosition());
        this.context.beginPath();
        this.context.clearRect(posX, posY, 30,30);
        
        if (gridSquare.isEmpty()) return;
        const object = gridSquare.getObject();
        const {width, height} = object.getIconSize();
        this.context.drawImage(object.getIcon(), posX, posY, width, height);
    }

    gridCoordinateToPosition = (position) => {
        return { "posX": (position.getX()*40)+20, "posY": (position.getY()*40)+15 };
    }

}