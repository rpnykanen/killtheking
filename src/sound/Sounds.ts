import EnemyDeathEvent from '../event/events/EnemyDeathEvent';
import PlayerShootEvent from '../event/events/PlayerShootEvent';
import EventManager from '@event/EventManager';

export default class Sounds {

  constructor() {
  }

  shoot() {
    console.log('shoot');
  }

  explode() {
    console.log('boom');
  }
}