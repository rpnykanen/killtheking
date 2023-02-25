import Position from "../grid/Position";
import Movement from "./Movement";
export default class Enemy {
    constructor(x, y, health) {
        this._oldPosition = null;
        this._position = new Position(x, 0);
        this._newPosition = new Position(x, 0);
        this.health = health;
        this.movement = [new Movement(0, 1)];
    }
    get Position() {
        return this._position;
    }
    get OldPosition() {
        return this._oldPosition;
    }
    get NewPosition() {
        return this._newPosition;
    }
    get IconName() {
        return this.iconName;
    }
    get icon() {
        return this.icon;
    }
    get iconSize() {
        return { "height": this.iconHeight, "width": this.iconWidth };
    }
}
