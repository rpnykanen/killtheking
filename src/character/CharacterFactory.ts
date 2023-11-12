import Position from "../grid/Position.js";
import Enemy from "./Enemy.js";
import King from "./King.js";
import Knight from "./Knight.js";
import Pawn from "./Pawn.js";
import Player from "./Player.js";

export default class CharacterFactory {

  public createRandomEnemy = (): Enemy => {
    const rand = Math.floor(Math.random() * 3);
    return rand % 2 === 0 && rand != 0 ? this.createKnight() : this.createPawn();
  }

  public createPawn = (): Pawn => {
    const health = 1;
    return new Pawn(new Position(1,1), health);
  }

  public createKnight = (): Knight => {
    const health = 1;
    return new Knight(new Position(1,1), health);
  }

  public createKing = (): King => {
    const health = 10;
    return new King(new Position(1,1), health);
  }

  public createPlayer = (): Player => {
    return new Player();
  }
}