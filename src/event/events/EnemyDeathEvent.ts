import Enemy from "../../character/Enemy.js";

export default class EnemyDeathEvent implements IEvent {

    static eventName: string = 'enemy.death';

    constructor(private _enemy: Enemy) {
    }

    static create = (enemy: Enemy) => {
        return new EnemyDeathEvent(enemy);
    }

    get enemy() { return this._enemy; } 

}