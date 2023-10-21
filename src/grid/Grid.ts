import GameUpdateEvent from "../event/events/GameUpdateEvent.js";
import EnemyDeathEvent from "../event/events/EnemyDeathEvent.js";
import Enemy from "../character/Enemy.js";
import GridSquare from "./GridSquare.js";
import PubSub from "../event/PubSub.js";
import Position from "./Position.js";
import Pawn from "../character/Pawn.js";
import Knight from "../character/Knight.js";
import RoundSkipEvent from "../event/events/RoundSkipEvent.js";
import Player from "../character/Player.js";
import King from "../character/King.js";
import GameOverEvent from "../event/events/GameOverEvent.js";
import pubsub from "../event/PubSub.js";
import PlayerShootEvent from "../event/events/PlayerShootEvent.js";
import CharacterFactory from "../character/CharacterFactory.js";

export default class Grid {

  private player: Player;

  private grid: GridSquare[] = [];

  private enemies: Enemy[] = [];

  private changes: GridSquare[] = [];

  constructor(private characterFactory: CharacterFactory) {
    PubSub.subscribe(RoundSkipEvent.EVENTNAME, this.afterRoundActions);
    this.player = this.characterFactory.createPlayer();
    this.buildGrid()
    this.spawnPlayer();
    this.spawnEnemy();
    this.updateGrid();
  }

  public action = (action: string) => {
    this.changes = [];
    if (action == 'ArrowLeft' || action == 'ArrowRight') {
      this.movePlayer(action);
      this.afterRoundActions();
    }
    if (action == 'ArrowUp') {
      pubsub.publish(new PlayerShootEvent(this.player.position));
      this.shoot();
      this.afterRoundActions();
    }
  }

  private spawnPlayer = () => {
    const square = this.getGridSquare(this.player.position)!;
    square.setCharacter(this.player);
    this.changes.push(square);
  }

  private movePlayer = (action: string) => {
    const oldPos = this.player.position
    if (
      action == 'ArrowLeft' && oldPos.x <= 0 ||
      action == 'ArrowRight' && oldPos.x >= 9
    ) {
      return;
    }
    const newPos = oldPos.clone();
    action == 'ArrowLeft' ? newPos.substractX() : newPos.addX();
    this.player.position = newPos;

    const oldGrid = this.getGridSquare(oldPos)!;
    const newGrid = this.getGridSquare(newPos)!;
    oldGrid && oldGrid.removeCharacter();
    newGrid && newGrid.setCharacter(this.player);
    this.changes.push(oldGrid, newGrid);
  }

  private removeEnemy = (enemy: Enemy) => {
    const gridSquare = this.getGridSquare(enemy.position)!;
    gridSquare.removeCharacter();
    this.enemies = this.enemies.filter(character => !character.position.equals(enemy.position));

    this.changes.push(gridSquare);
    PubSub.publish(EnemyDeathEvent.create(enemy));
  }

  private shoot = () => {
    const x = this.player.position.x;
    const enemyHit = this.enemies.filter(enemy => enemy.position.x === x)
      ?.reduce((accumulator: Enemy | null, enemy: Enemy) => {
        accumulator = accumulator === null ? enemy : accumulator;
        return enemy.position.y > accumulator.position.y ? enemy : accumulator;
      }, null)

    if (!enemyHit) {
      return;
    }

    enemyHit.reduceHealth(1);
    if (enemyHit.isDead()) {
      this.removeEnemy(enemyHit);
    }
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
    // get rid of that "10"
    const x = Math.floor(Math.random() * 10);
    const y = 0;
    const position = new Position(x, y);
    const square = this.getGridSquare(position);
    if (!square || !square.isEmpty()) {
      this.findEmptySpawn();
    }
    return square!;
  }

  private moveEnemies = () => {
    this.enemies.forEach((enemy: Enemy) => {
      if (!enemy.position) return;

      if (enemy.position.y >= 14 && enemy.movement.y > 0) {
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
    this.enemies.push(new King(new Position(4, 0), 10));
  }

  private afterRoundActions = () => {
    this.moveEnemies();
    if (this.enemies.length < 3) {
      this.spawnEnemy();
    }
    this.updateGrid();
  }

  public updateGrid = () => {
    PubSub.publish(GameUpdateEvent.create(this.changes));
    this.changes = [];
  }

  public end = () => {
    this.enemies = [];
    this.enemies.forEach((enemy: Enemy) => {
      this.changes.push(this.getGridSquare(enemy.position)!)
    });
  }

  private buildGrid = () => {
    for (let y = 0; y <= 15; y++) {
      for (let x = 0; x <= 9; x++) {
        this.grid.push(new GridSquare(x, y));
      }
    }
  }

  private getGridSquare = (position: Position): GridSquare | null => {
    const index = position.y * 10 + position.x;
    return this.grid[index] ?? null;
  }

  private isValidPosition = (position: Position): boolean => {
    return position.x >= 0 && position.x <= 9 && position.y >= 0 && position.y <= 15;
  }

}