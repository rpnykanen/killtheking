import GameUpdateEvent from "../event/events/GameUpdateEvent.js";
import EnemyDeathEvent from "../event/events/EnemyDeathEvent.js";
import Enemy from "../character/Enemy.js";
import GridSquare from "./GridSquare.js";
import PubSub from "../event/PubSub.js";
import Position from "./Position.js";
import RoundSkipEvent from "../event/events/RoundSkipEvent.js";
import Player from "../character/Player.js";
import GameOverEvent from "../event/events/GameOverEvent.js";
import pubsub from "../event/PubSub.js";
import CharacterFactory from "../character/CharacterFactory.js";
import Controller from "../Controller.js";
import { GridOptions } from "../types/Options.js";

export default class Grid {

  private player: Player;

  private grid: GridSquare[] = [];

  private enemies: Enemy[] = [];

  private changes: GridSquare[] = [];

  constructor(
      private controller: Controller,
      private characterFactory: CharacterFactory,
      private gridOptions: GridOptions
  ) {
    PubSub.subscribe(RoundSkipEvent.EVENTNAME, this.afterRoundActions);
    this.controller.move = this.movePlayer;
    this.controller.shoot = this.shoot;
    this.controller.skip = this.afterRoundActions;
  }

  initialize = () => {
    this.player = this.characterFactory.createPlayer();
    this.buildGrid()
    this.spawnPlayer();
    this.afterRoundActions();
  }

  private spawnPlayer = () => {
    const square = this.getGridSquare(this.player.position)!;
    square.setCharacter(this.player);
    this.changes.push(square);
  }

  private movePlayer = (movingLeft: boolean) => {
    const currentPosition = this.player.position
    if (
      movingLeft && currentPosition.x <= 0 ||
      !movingLeft && currentPosition.x >= (this.gridOptions.width-1)
    ) {
      return;
    }

    const newPosition = currentPosition.clone();
    movingLeft ? newPosition.substractX() : newPosition.addX();
    this.player.position = newPosition;

    const oldGrid = this.getGridSquare(currentPosition)!;
    const newGrid = this.getGridSquare(newPosition)!;
    
    oldGrid && oldGrid.removeCharacter();
    newGrid && newGrid.setCharacter(this.player);
    this.changes.push(oldGrid, newGrid);

    this.afterRoundActions();
  }

  private shoot = () => {
    const x = this.player.position.x;
    const enemyHit = this.enemies.filter(enemy => enemy.position.x === x)
      ?.reduce((accumulator: Enemy | null, enemy: Enemy) => {
        accumulator = accumulator === null ? enemy : accumulator;
        return enemy.position.y > accumulator.position.y ? enemy : accumulator;
      }, null)

    if (enemyHit) {
      enemyHit.reduceHealth(1);
      if (enemyHit.isDead()) {
        this.removeEnemy(enemyHit);
      }
    }
    this.afterRoundActions();
  }

  private removeEnemy = (enemy: Enemy) => {
    const gridSquare = this.getGridSquare(enemy.position)!;
    gridSquare.removeCharacter();
    this.enemies = this.enemies.filter(character => !character.position.equals(enemy.position));

    this.changes.push(gridSquare);
    PubSub.publish(new EnemyDeathEvent(enemy));
  }

  private spawnEnemy = () => {
    const gridSquare = this.findEmptySpawn();
    const enemy = this.characterFactory.createRandomEnemy();

    gridSquare.setCharacter(enemy);
    this.changes.push(gridSquare);

    enemy.setPosition(gridSquare.position);
    this.enemies.push(enemy);
  }

  private findEmptySpawn(): GridSquare {
    const randomX = Math.floor(Math.random() * 10);
    const y = 0;
    const position = new Position(randomX, y);
    const square = this.getGridSquare(position);
    if (!square || !square.isEmpty()) {
      this.findEmptySpawn();
    }
    return square!;
  }

  private moveEnemies = () => {
    this.enemies.forEach((enemy: Enemy) => {
      if (!enemy.position) return;

      if (enemy.position.y >= (this.gridOptions.height-1) && enemy.movement.y > 0) {
        pubsub.publish(new GameOverEvent());
        return;
      }

      const oldGrid = this.getGridSquare(enemy.position)!;
      oldGrid.removeCharacter();

      const allowed = enemy.possiblePositions.filter((p: Position) => {
        return this.isValidPosition(p) && this.getGridSquare(p)?.isEmpty();
      });

      if (allowed.length === 0) {
        oldGrid.setCharacter(enemy);
        return;
      }

      this.changes.push(oldGrid);

      const position = allowed[Math.floor(Math.random() * allowed.length)];

      enemy.setPosition(position);
      const newGrid = this.getGridSquare(position);

      newGrid && newGrid.setCharacter(enemy);
      newGrid && this.changes.push(newGrid);
    });
  }

  public spawnBoss = () => {
    const gridSquare = this.findEmptySpawn();
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
    this.updateGrid();
  }

  public updateGrid = () => {
    PubSub.publish(new GameUpdateEvent(this.changes));
    this.changes = [];
  }

  public end = () => {
    this.enemies = [];
    this.enemies.forEach((enemy: Enemy) => {
      this.changes.push(this.getGridSquare(enemy.position)!)
    });
  }

  private buildGrid = () => {
    for (let y = 0; y <= this.gridOptions.height; y++) {
      for (let x = 0; x < this.gridOptions.width; x++) {
        this.grid.push(new GridSquare(x, y));
      }
    }
  }

  private getGridSquare = (position: Position): GridSquare | null => {
    const index = position.y * this.gridOptions.width + position.x;
    return this.grid[index] ?? null;
  }

  private isValidPosition = (position: Position): boolean => {
    return position.x >= 0 && position.x < this.gridOptions.width &&
      position.y >= 0 && position.y <= this.gridOptions.height;
  }

}