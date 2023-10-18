import Enemy from "../../character/Enemy.js";

export default class EnemyDeathEvent implements IEvent {

  static EVENTNAME = 'enemy.death';

  constructor(private _enemy: Enemy) { }

  static create = (enemy: Enemy) => new EnemyDeathEvent(enemy);

  get enemy() { return this._enemy; }

  get position() { return this._enemy.position }

  get eventName() { return EnemyDeathEvent.EVENTNAME; }
}