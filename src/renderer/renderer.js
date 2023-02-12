import { gridCoordinateToPosition } from "./helper.js";

export default class Renderer {

    // Box width
    static bw = 400;
    // Box height
    static bh = 600;
    // Padding
    static p = 10;

    constructor(context, grid, manager, player /*, obstacles */){
        this.context = context;
        this.grid = grid;
        this.manager = manager;
        this.player = player;

        const img = new Image();
        img.src = '../../images/player.svg';
        this.playerIcon = img;
        this.player.setIcon(img);
        
        /*
        if (img.complete) { //check if image was already loaded by the browser
            console.log('truu');
            //this.context.drawImage(img, 15, 15, 30, 30);
         } else {
            console.log('false');
            img.onload = () => {
                console.log(img.complete);
                //this.context.drawImage(img, 15, 15,10,10);
            }
         }
       */
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

    update = () => {
        this.renderCharacters([this.player]);
        this.renderEnemies();
    }

    renderCharacters = (characters) => {
        characters.forEach(character => {
            const {oldX,oldY} = character.getOldPosition();
            const {posX: oldPosX, posY: oldPosY} = gridCoordinateToPosition(oldX, oldY);
            const {x,y} = character.getPosition();
            const {height, width} = character.getIconSize();
            console.log('size', width, height);
            const {posX: newPosX, posY: newPosY} = gridCoordinateToPosition(x, y);
            console.log('character', newPosX, newPosY);
            this.context.beginPath();
            this.context.clearRect (oldPosX, oldPosY,width , height);
            this.context.drawImage(character.getIcon(), newPosX, newPosY, width , height);
        })

    }

    renderEnemies = () => {
        this.renderCharacters(this.manager.getEnemies());
    }

}