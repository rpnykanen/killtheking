import EnemyDeathEvent from '../event/events/EnemyDeathEvent';
import PlayerShootEvent from '../event/events/PlayerShootEvent';
import pubsub from '../event/PubSub';

export default class Sounds {

  constructor() {
    pubsub.subscribe(PlayerShootEvent.EVENTNAME, this.shoot);
    pubsub.subscribe(EnemyDeathEvent.EVENTNAME, this.explode)
  }

  shoot() {
    console.log('shoot');
  }

  explode() {
    console.log('boom');
  }
}