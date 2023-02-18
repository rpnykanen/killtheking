import Character from "./character.js";
import Position from "../grid/position.js";
import pubsub from "../event/pubSub.js";

export default class Player extends Character {
    
    static iconHeight = 30;
    static iconWidth = 30;

    constructor() {
        super();
        this.position = new Position(0, 15);
        this.oldPosition = null;

        const img = new Image();
        img.src = '../../images/player.svg';
        this.setIcon(img);

        pubsub.subscribe('keyboard.event', this.action);
    }

    getPosition = () => this.position;

    action = (action) => {
        if (action == 'left' || action == 'right') {
            this.oldPosition = this.position.clone();

            if (action == 'left') {
                const x = this.position.getX() > 0 ? 1 : 0;
                this.position.substractX(x);
            } else {
                const x = this.position.getX() < 9 ?  1 : 0;
                this.position.addX(x);
            }
            pubsub.publish('player.move', {oldPos: this.oldPosition, newPos: this.position});
        }
        if (action == 'shoot') {
            pubsub.publish('player.shoot', this.position);
        }

        if (action == 'skip') {
            pubsub.publish('player.skip', {});
        }

    }

    getIconSize = () => {
        return {"height": Player.iconHeight, "width": Player.iconWidth}
    }

}