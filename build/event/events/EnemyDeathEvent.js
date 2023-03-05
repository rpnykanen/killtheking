export default class EnemyDeathEvent {
    constructor(_enemy) {
        this._enemy = _enemy;
    }
    get enemy() { return this._enemy; }
    get position() { return this._enemy.position; }
    get eventName() { return EnemyDeathEvent.EVENTNAME; }
}
EnemyDeathEvent.EVENTNAME = 'enemy.death';
EnemyDeathEvent.create = (enemy) => new EnemyDeathEvent(enemy);
