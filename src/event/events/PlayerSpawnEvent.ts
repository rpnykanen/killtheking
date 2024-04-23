import Player from "@board/character/Player";
import Position from "../../board/Position";
import IGridEvent from "./IGridEvent";

export default class PlayerSpawnEvent implements IGridEvent {
  static EVENTNAME = 'player.spawn';

  constructor(private _player: Player) { }

  get player(): Player { return this._player }

  get playerPosition(): Position { return this.player.position }

  get x(): number { return this.player.position.x }

  get y(): number { return this.player.position.y }

  get eventName() { return 'player.spawn'; }
}