import Character from "./character.js";
import Position from "../grid/position.js";

export default class Player extends Character {
    
    static iconHeight = 30;
    static iconWidth = 30;

    constructor() {
        super();
        this.position = new Position(0, 15);
        this.oldPosition = new Position(0,15);

        const img = new Image();
        img.src = '../../images/player.svg';
        this.setIcon(img);
    }

    getPosition = () => this.position;

    right = () => {
        this.oldPosition = this.position.clone();
        const x = this.position.getX() < 9 ?  1 : 0;
        this.position.addX(x);
    }

    left = () => {
        this.oldPosition = this.position.clone();
        const x = this.position.getX() > 0 ? 1 : 0;
        this.position.substractX(x)
    }

    getIconSize = () => {
        return {"height": Player.iconHeight, "width": Player.iconWidth}
    }

}