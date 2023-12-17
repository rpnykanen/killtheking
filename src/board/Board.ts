import CharacterFactory from "../character/CharacterFactory";
import Controller from "../Controller";
import Enemy from "../character/Enemy";
import EnemyDeathEvent from "../event/events/EnemyDeathEvent";
import GameOverEvent from "../event/events/GameOverEvent";
import GameUpdateEvent from "../event/events/GameUpdateEvent";
import GridSquare from "./GridSquare";
import Grid from "./Grid";
import Player from "../character/Player";
import Position from "./Position";
import Pubsub from "../event/PubSub";
import RoundSkipEvent from "../event/events/RoundSkipEvent";
import { randomNumber } from "../utils/RandomHelper";

export default class Board {

  private player: Player;

  private enemies: Enemy[] = [];

  private changes: GridSquare[] = [];

  private killCount = 0;

  constructor(
    private grid: Grid,
    private controller: Controller,
    private characterFactory: CharacterFactory,
  ) {
    Pubsub.subscribe(RoundSkipEvent.EVENTNAME, this.afterRoundActions);
    this.controller.move = this.movePlayer;
    this.controller.shoot = this.shoot;
    this.controller.skip = this.afterRoundActions;
  }

  initialize = () => {
    this.grid.initialize();
    this.player = this.characterFactory.createPlayer();
    this.spawnPlayer();
    this.afterRoundActions();
  }

  private spawnPlayer = () => {
    const square = this.grid.getGridSquare(this.player.position);
    square.notNull() && square.setCharacter(this.player);
    square.notNull() && this.changes.push(square);
  }

  // wronk with the gridoption.width. something is out of place.
  private movePlayer = (movingLeft: boolean) => {
    const currentPosition = this.player.position
    if (
      movingLeft && currentPosition.x <= 0 ||
      !movingLeft && currentPosition.x >= 9//(this.gridOptions.width-1)
    ) {
      return;
    }

    const newPosition = currentPosition.clone();
    movingLeft ? newPosition.substractX() : newPosition.addX();
    this.player.position = newPosition;

    const oldGrid = this.grid.getGridSquare(currentPosition);
    const newGrid = this.grid.getGridSquare(newPosition);
    
    oldGrid.removeCharacter();
    newGrid.setCharacter(this.player);
    this.changes.push(oldGrid, newGrid);

    this.afterRoundActions();
  }

  private shoot = () => {
    const x = this.player.position.x;
    const enemyHit = this.enemies.filter(enemy => enemy.position.x === x)
      ?.reduce((accumulator: Enemy | null, enemy: Enemy) => {
        accumulator = accumulator === null ? enemy : accumulator;
        return enemy.position.y > accumulator.position.y ? enemy : accumulator;
      }, null);

    if (enemyHit) {
      enemyHit.reduceHealth(1);
      if (enemyHit.isDead()) {
        this.removeEnemy(enemyHit);
      }
    }
    this.afterRoundActions();
  }

  private removeEnemy = (enemy: Enemy) => {
    const gridSquare = this.grid.getGridSquare(enemy.position);
    gridSquare.removeCharacter();
    this.enemies = this.enemies.filter(character => !character.position.equals(enemy.position));

    this.changes.push(gridSquare);
    Pubsub.publish(new EnemyDeathEvent(enemy));
  }

  private spawnEnemy = () => {
    const gridSquare = this.grid.getEmptySpawn();
    const enemy = this.characterFactory.createRandomEnemy();
    
    // spawn boss if...
    // this.spawnBoss();

    gridSquare.setCharacter(enemy);
    this.changes.push(gridSquare);

    enemy.setPosition(gridSquare.position);
    this.enemies.push(enemy);
  }

  private moveEnemies = () => {
    this.enemies.forEach((enemy: Enemy) => {
      if (!enemy.position) return;

      const newPossibleEnemyPositions = enemy.possiblePositions;

      if (enemy.movement.y > 0 && this.grid.isOutOfBoundsY(newPossibleEnemyPositions[0])) {
        Pubsub.publish(new GameOverEvent());
        return;
      }

      const oldGrid = this.grid.getGridSquare(enemy.position);
      oldGrid.removeCharacter();

      const allowed = newPossibleEnemyPositions.filter((position: Position) => {
        return this.grid.isValidPosition(position) && this.grid.isEmpty(position);
      });

      if (allowed.length === 0) {
        oldGrid.setCharacter(enemy);
        return;
      }

      this.changes.push(oldGrid);
      const position = allowed[randomNumber(allowed.length)];

      enemy.setPosition(position);
      const newGrid = this.grid.getGridSquare(position);

      newGrid && newGrid.setCharacter(enemy);
      newGrid && this.changes.push(newGrid);
    });
  }

  public spawnBoss = () => {
    const gridSquare = this.grid.getEmptySpawn();
    const king = this.characterFactory.createKing();

    gridSquare.setCharacter(king);
    this.changes.push(gridSquare);

    king.setPosition(gridSquare.position);
    this.enemies.push(king);
  }

  private afterRoundActions = () => {
    this.moveEnemies();
    if (this.enemies.length < 3) {
      this.spawnEnemy();
    }
    Pubsub.publish(new GameUpdateEvent(this.changes));
    this.changes = [];
  }

  public end = () => {
    /*
    this.enemies.forEach((enemy: Enemy) => {
      this.changes.push(this.grid.getGridSquare(enemy.position))
    });
    */
    this.enemies = [];
  }

}