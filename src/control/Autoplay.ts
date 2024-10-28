import Control from "./Control";
import GameRoundEvent from "@event/events/GameRoundEvent";
import Enemy from "@board/character/Enemy";
import EventManager from "@event/EventManager";
import EnemySpawnEvent from "@event/events/EnemySpawnEvent";
import Player from "@board/character/Player";
import PlayerSpawnEvent from "@event/events/PlayerSpawnEvent";

export default class Autoplay extends Control {
  private enemies: Enemy[] = [];

  private target: Enemy;

  private player: Player;

  constructor(private eventManager: EventManager){
    super();
    this.eventManager.subscribe(GameRoundEvent.EVENTNAME, this.act);
    this.eventManager.subscribe(EnemySpawnEvent.EVENTNAME, this.addTrackedEnemies);
    this.eventManager.subscribe(PlayerSpawnEvent.EVENTNAME, this.setPlayer);
  }

  private act = () => {
    let doAction: CallableFunction;
    let left: boolean;

    if (this.enemies.length === 0 && !this.target) return;

    if (this.target?.position.x === this.player.position.x) {
      this.removeTrackedEnemies(this.target);
      doAction = this._shoot;
    } else {
      left = this.player.position.x > this.target?.position.x;
      doAction = this._move
    }

    setTimeout(()=>{
      left !== undefined ? doAction(left) : doAction();
      return;
    }, 175)
  }

  private findBiggerThreat = (): Enemy => {
    return this.enemies.reduce((prev: Enemy, curr: Enemy): Enemy => {
      const threat1 = this.calculateThreat(prev);
      const threat2 = this.calculateThreat(curr);
      return threat1 > threat2 ? prev : curr;
    });
  }

  private calculateThreat = (enemy: Enemy): number => {
    return enemy.position.y * 2 * enemy.difficulty;
  }

  private addTrackedEnemies = (event: EnemySpawnEvent) => {
    if (!event.enemy) return;
    this.enemies.push(event.enemy)
    this.target = this.findBiggerThreat();
  }

  private removeTrackedEnemies = (killedEnemy: Enemy) => {
    this.enemies = this.enemies
      .filter((enemy:Enemy) => enemy !== undefined)
      .filter((enemy: Enemy) => enemy !== killedEnemy);
  }

  private setPlayer = (event: PlayerSpawnEvent) => {
    this.player = event.player;
  }
}