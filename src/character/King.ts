import pubsub from "../event/PubSub.js";
import EnemyHitEvent from "../event/events/EnemyHitEvent.js";
import GameOverEvent from "../event/events/GameOverEvent.js";
import Position from "../grid/Position.js";
import Enemy from "./Enemy.js";
import Icon from "./Icon.js";
import Movement from "./Movement.js";

export default class King extends Enemy {
  constructor(position: Position, health: number) {
    super(position, health);
    this._icon = new Icon(30, 35, '../../images/king.svg');
    this._movement = [
      [new Movement(0, 0), new Movement(0, 0), new Movement(-1, 1)],
      [new Movement(0, 0), new Movement(0, 0), new Movement(0, 1)],
      [new Movement(0, 0), new Movement(0, 0), new Movement(1, 1)],
    ]
  }

  reduceHealth = (damage: number): void => {
    this._health -= damage;
    pubsub.publish(new EnemyHitEvent(this));
    if (this.isDead()) pubsub.publish(new GameOverEvent());
  }

}