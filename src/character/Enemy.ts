import Position from "../grid/Position";
import Character from "./Character";
import Icon from "./Icon";
import Movement from "./Movement";

export default abstract class Enemy implements Character {
    protected _position: Position;
    protected _oldPosition: Position | null;
    protected _newPosition: Position;
    protected health: number;
    protected movement: Movement;
    
    protected iconName: string;
    protected iconHeight: number;
    protected iconWidth: number;
    protected Icon: string;


    // protected abstract icon: Icon;

    constructor(x: number, y:number, health:number) {
        this._oldPosition = null;
        this._position = new Position(x,0);
        this._newPosition = new Position(x,0);
        this.health = health;

        // const icon = new Image();
        // icon.src = iconName;
        // this.icon = icon;

        this.movement = [new Movement(0,1)]
    }

    //TODO isot kirjaimet

    get Position(): Position {
        return this._position;
    }

    get OldPosition(): Position | null {
        return this._oldPosition;
    }

    get NewPosition(): Position | null {
        return this._newPosition;
    }

    get IconName(): string {
        return this.iconName;
    } 
 
    get icon(): string {
        return this.icon;
    }

    get iconSize(): object {
        return {"height": this.iconHeight, "width": this.iconWidth}
    }
}