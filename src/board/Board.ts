import CharacterFactory from "./character/CharacterFactory";
import Enemy from "./character/Enemy";
import EnemyDeathEvent from "../event/events/EnemyDeathEvent";
import GameOverEvent from "../event/events/GameOverEvent";
import GameUpdateEvent from "../event/events/GameUpdateEvent";
import GridSquare from "./GridSquare";
import Grid from "./Grid";
import Player from "./character/Player";
import Position from "./Position";
import EventManager from "@event/EventManager";
import { randomNumber } from "../utils/RandomHelper";
import EnemyHitEvent from "@event/events/EnemyHitEvent";

export default class Board {

  /** 
   * The player character.
   */
  private player: Player;

  /** 
   * The enemy characters.
   */
  private enemies: Enemy[] = [];

  /** 
   * Tracks the changes to gridsquares during a round.
   */
  private changes: GridSquare[] = [];

  /** 
   * The end-game enemy.
   */
  private boss: Enemy | null = null;

  /** 
   * How many enemies have been removed from the board.
   */
  private deadEnemyCount = 0;

  private maxEnemies = 3;

  constructor(
    private grid: Grid,
    private characterFactory: CharacterFactory,
    private eventManager: EventManager
  ) {
  }

  public initialize = (): void  => {
    this.player = this.characterFactory.createPlayer();
    this.spawnPlayer();
    this.afterRoundActions();
  }

  /**
   * Action allowing the player to update the player-character position.
   * 
   * @param movingLeft
   *   Is player moving left.
   */
  public movePlayer = (movingLeft: boolean): void  => {
    const currentPosition = this.player.position
    if (
      movingLeft && currentPosition.x <= 0 ||
      !movingLeft && currentPosition.x >= this.grid.getMaxX
    ) {
      return;
    }
    
    const newPosition = currentPosition.clone();
    movingLeft ? newPosition.substractX() : newPosition.addX();
    this.player.position = newPosition;

    const oldGridSquare = this.grid.getGridSquare(currentPosition);
    const newGridSquare = this.grid.getGridSquare(newPosition);
    
    oldGridSquare.removeCharacter();
    newGridSquare.setCharacter(this.player);
    this.changes.push(oldGridSquare, newGridSquare);

    this.afterRoundActions();
  }

  /**
   * Action allowing player to remove enemies from the board.
   */
  public shoot = (): void  => {
    // TODO Reducer null, why ?
    const enemyHit = this.enemies.filter(enemy => enemy.position.x === this.player.position.x)
      ?.reduce((accumulator: Enemy | null, enemy: Enemy) => {
        accumulator = accumulator === null ? enemy : accumulator;
        return enemy.position.y > accumulator.position.y ? enemy : accumulator;
      }, null);
    
    if (!enemyHit) return;

    enemyHit.reduceHealth(1);

    this.eventManager.publish(new EnemyHitEvent(enemyHit));

    this.afterRoundActions();
  }

  /**
   * Procedure to wrap up an in-game round.
   */
  public afterRoundActions = (): void  => {
    const win = this.checkWincondition();
    this.removeDeadEnemies();
    const lose = this.checkLosecondition();

    if (win || lose) {
      this.eventManager.publish(new GameOverEvent(win));
      return;
    }

    this.moveEnemies();
    
    this.handleEndgameState();
    this.spawnEnemy();
    
    this.eventManager.publish(new GameUpdateEvent(this.changes));
    this.changes = [];
  }

  private checkWincondition = (): boolean  => {
    const enemy = this.enemies.find((enemy) => {
      return enemy.isBoss && enemy.isDead;
    })
    return !!enemy
  }

  private checkLosecondition = (): boolean  => {
    const enemy = this.enemies.find((enemy: Enemy) => {
      const position = enemy.possiblePositions[0];
      return enemy.movement.y > 0 && this.grid.isOutOfBoundsY(position)
    });
    return !!enemy;
  }

  private removeDeadEnemies = (): void => {
    this.enemies = this.enemies.map((enemy) => {
      if (!enemy.isDead) return enemy;

      this.removeEnemy(enemy);
      this.eventManager.publish(new EnemyDeathEvent(enemy));
      this.deadEnemyCount += 1;
      return enemy;
    })
    .filter((enemy) => {
      return !enemy.isDead;
    });
  } 

  // TODO rename
  private removeEnemy = (enemy: Enemy): void  => {
    const gridSquare = this.grid.getGridSquare(enemy.position);
    gridSquare.removeCharacter();
    this.changes.push(gridSquare);
  }

  private moveEnemies = (): void => {
    this.enemies.forEach((enemy: Enemy) => {
      const newPossibleEnemyPositions = enemy.possiblePositions;

      const allowed = newPossibleEnemyPositions.filter((position: Position) => {
        return this.grid.isValidPosition(position) && this.grid.isEmpty(position);
      });

      if (allowed.length === 0) {
        enemy.setPosition(enemy.position);
        return;
      } 
      
      // TODO check if it's necessary to track enemy position in multiple places.
      // Should character know it's own position?
      this.removeEnemy(enemy)
      const position = allowed[randomNumber(allowed.length)];
      enemy.setPosition(position);

      const newGrid = this.grid.getGridSquare(position);
      newGrid.setCharacter(enemy);
      this.changes.push(newGrid);
    });
  }

  private spawnPlayer = () => {
    const square = this.grid.getGridSquare(this.player.position);
    square.setCharacter(this.player);
    this.changes.push(square);
  }

  private spawnEnemy = (): void => {
    if (this.isBoardFull()) return;

    const gridSquare = this.grid.getEmptySpawn();
    const enemy = this.characterFactory.createRandomEnemy();

    gridSquare.setCharacter(enemy);
    this.changes.push(gridSquare);

    enemy.setPosition(gridSquare.position, false);
    this.enemies.push(enemy);
    this.changes.push(gridSquare);
  }

  private isBoardFull(): boolean {
    return this.enemies.length >= this.maxEnemies;
  }

  private handleEndgameState = (): void  => {
    if (this.deadEnemyCount !== 20 || this.boss) return;
  
    this.boss = this.characterFactory.createKing();
    this.enemies.push(this.boss);
  }

}