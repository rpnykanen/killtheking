import Enemy from "../../character/Enemy.js";

export default class EnemyHitEvent implements IEvent {
    static EVENTNAME: string = 'enemy.hit';

    constructor(private _enemy: Enemy) {}

    static create = (enemy: Enemy) => new EnemyHitEvent(enemy);

    get enemy() { return this._enemy; }

    get position() { return this._enemy.position }

    get eventName() { return EnemyHitEvent.EVENTNAME; }
}