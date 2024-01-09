import Enemy from "./Enemy";
import EnemyHitEvent from "../../event/events/EnemyHitEvent";
import GameOverEvent from "../../event/events/GameOverEvent";
import Icon from "./Icon";
import Movement from "./Movement";
import Position from "../Position";
import Pubsub from "../../event/PubSub";


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
    Pubsub.publish(new EnemyHitEvent(this));
    if (this.isDead()) Pubsub.publish(new GameOverEvent());
  }

}