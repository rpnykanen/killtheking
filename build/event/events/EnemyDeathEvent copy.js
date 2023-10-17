export default class EnemyHitEvent {
    constructor(_enemy) {
        this._enemy = _enemy;
    }
    get enemy() { return this._enemy; }
    get position() { return this._enemy.position; }
    get eventName() { return EnemyHitEvent.EVENTNAME; }
}
EnemyHitEvent.EVENTNAME = 'enemy.hit';
EnemyHitEvent.create = (enemy) => new EnemyHitEvent(enemy);
