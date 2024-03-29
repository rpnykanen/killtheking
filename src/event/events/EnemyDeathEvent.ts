import Enemy from "../../board/character/Enemy";

export default class EnemyDeathEvent implements IGridEvent {

  static EVENTNAME = 'enemy.death';

  constructor(private _enemy: Enemy) { }

  get enemy() { return this._enemy; }

  get x () { return this._enemy.position.x; }

  get y () { return this._enemy.position.y; }

  get eventName() { return 'enemy.death'; }
}