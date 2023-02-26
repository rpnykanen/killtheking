import Position from "../grid/Position";
import Character from "./Character";
import Icon from "./Icon";
import Movement from "./Movement";

export default abstract class Enemy implements Character {
    protected _position: Position;
    protected _oldPosition: Position;
    protected _newPosition: Position;
    protected _health: number;
    protected _movement: Movement;
    
    protected _iconName: string;
    protected _iconHeight: number;
    protected _iconWidth: number;
    protected _icon: Icon;

    constructor(x: number, y:number, health:number) {
        this._oldPosition = new Position(x,0);
        this._position = new Position(x,0);
        this._newPosition = new Position(x,0);
        this._health = health;
        this._movement = [new Movement(0,1)]
    }

    get position(): Position {
        return this._position;
    }

    get oldPosition(): Position {
        return this._oldPosition;
    }

    get newPosition(): Position {
        return this._newPosition;
    }
 
    get icon(): Icon {
        return this._icon;
    }

}