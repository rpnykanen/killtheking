import EnemyDeathEvent from '../event/events/EnemyDeathEvent.js';
import PlayerShootEvent from '../event/events/PlayerShootEvent.js';
import pubsub from '../event/PubSub.js';
export default class Sounds {
    constructor() {
        pubsub.subscribe(PlayerShootEvent.EVENTNAME, this.shoot);
        pubsub.subscribe(EnemyDeathEvent.EVENTNAME, this.explode);
    }
    shoot() {
        console.log('shoot');
    }
    explode() {
        console.log('boom');
    }
}
