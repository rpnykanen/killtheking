export default class EnemyDeathEvent {
    constructor(_enemy) {
        this._enemy = _enemy;
    }
    get enemy() { return this._enemy; }
}
EnemyDeathEvent.eventName = 'enemy.death';
EnemyDeathEvent.create = (enemy) => {
    return new EnemyDeathEvent(enemy);
};
