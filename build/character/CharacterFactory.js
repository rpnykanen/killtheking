import Position from "../grid/Position.js";
import King from "./King.js";
import Knight from "./Knight.js";
import Pawn from "./Pawn.js";
import Player from "./Player.js";
export default class CharacterFactory {
    constructor() {
        this.createRandomEnemy = () => {
            return this.createPawn();
        };
        this.createPawn = () => {
            const health = 1;
            return new Pawn(new Position(1, 1), 1);
        };
        this.createKnight = () => {
            const health = 1;
            return new Knight(new Position(1, 1), 1);
        };
        this.createKing = () => {
            const health = 10;
            return new King(new Position(1, 1), 1);
        };
        this.createPlayer = () => {
            return new Player();
        };
    }
    get position() {
        return this._position;
    }
    get oldPosition() {
        return this._oldPosition;
    }
    get icon() {
        return this._icon;
    }
}
