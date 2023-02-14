import Character from "./character.js";

export default class Player extends Character {
    
    static Y = 0;

    static iconHeight = 30;
    static iconWidth = 30;

    constructor() {
        super();
        this.x = 0;
        this.y = 15
        this.oldX = 0;
        this.oldY = 15;

        const img = new Image();
        img.src = '../../images/player.svg';
        this.setIcon(img);
    }

    right = () => {
        this.oldX = this.x;
        this.x += this.x < 9 ? 1 : 0;
    }

    left = () => {
        this.oldX = this.x;
        this.x -= this.x > 0 ? 1: 0;
    }

    getIconSize = () => {
        return {"height": Player.iconHeight, "width": Player.iconWidth}
    }

}