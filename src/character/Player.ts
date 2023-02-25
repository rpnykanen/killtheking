import Position from "../grid/Position";
import Character from "./Character";

export default class Player implements Character {
    
    get Position(): Position {
        return new Position(0, 15);
    }

    get OldPosition(): Position {
        throw new Error("Method not implemented.");
    }
    get IconName(): string {
        throw new Error("Method not implemented.");
    }
    get icon(): string {
        throw new Error("Method not implemented.");
    }
    get iconSize(): object {
        throw new Error("Method not implemented.");
    }

}