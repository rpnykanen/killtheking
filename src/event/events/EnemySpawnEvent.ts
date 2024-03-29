import Enemy from "../../board/character/Enemy";

export default class EnemyHitEvent implements IGridEvent {
  static EVENTNAME = 'enemy.hit';

  constructor(private _enemy: Enemy) { }

  get enemy(): Enemy { return this._enemy}

  get type(): string { return this._enemy.constructor.name }

  get x(): number { return this._enemy.position.x }

  get y(): number { return this._enemy.position.y }

  get eventName() { return 'enemy.hit'; }
}