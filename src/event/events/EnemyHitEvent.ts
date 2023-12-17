import Enemy from "../../character/Enemy.js";
import Icon from "../../character/Icon.js";

export default class EnemyHitEvent implements IGridEvent {
  static EVENTNAME = 'enemy.hit';

  constructor(private _enemy: Enemy) { }

  get icon() : Icon { return this._enemy.icon }

  get x(): number { return this._enemy.position.x }

  get y(): number { return this._enemy.position.y }

  get eventName() { return EnemyHitEvent.EVENTNAME; }
}