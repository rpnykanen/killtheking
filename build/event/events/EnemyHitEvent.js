export default class EnemyHitEvent {
    constructor(_enemy) {
        this._enemy = _enemy;
    }
    get icon() { return this._enemy.icon; }
    get x() { return this._enemy.position.x; }
    get y() { return this._enemy.position.y; }
    get eventName() { return EnemyHitEvent.EVENTNAME; }
}
EnemyHitEvent.EVENTNAME = 'enemy.hit';
