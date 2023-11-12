export default class EnemyDeathEvent {
    constructor(_enemy) {
        this._enemy = _enemy;
    }
    get enemy() { return this._enemy; }
    get x() { return this._enemy.position.x; }
    get y() { return this._enemy.position.y; }
    get eventName() { return EnemyDeathEvent.EVENTNAME; }
}
EnemyDeathEvent.EVENTNAME = 'enemy.death';
