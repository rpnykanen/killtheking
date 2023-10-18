import GameUpdateEvent from "../event/events/GameUpdateEvent.js";
import EnemyDeathEvent from "../event/events/EnemyDeathEvent.js";
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
export default class Grid {
    constructor() {
        this.grid = [];
        this.enemies = [];
        this.changes = [];
        this.action = (action) => {
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
        };
        this.spawnPlayer = () => {
            const square = this.getGridSquare(this.player.position);
            square.setCharacter(this.player);
            this.changes.push(square);
        };
        this.movePlayer = (action) => {
            const oldPos = this.player.position;
            if (action == 'ArrowLeft' && oldPos.x <= 0 ||
                action == 'ArrowRight' && oldPos.x >= 9) {
                return;
            }
            const newPos = oldPos.clone();
            action == 'ArrowLeft' ? newPos.substractX() : newPos.addX();
            this.player.position = newPos;
            const oldGrid = this.getGridSquare(oldPos);
            const newGrid = this.getGridSquare(newPos);
            oldGrid && oldGrid.removeCharacter();
            newGrid && newGrid.setCharacter(this.player);
            this.changes.push(oldGrid, newGrid);
        };
        this.removeEnemy = (enemy) => {
            const gridSquare = this.getGridSquare(enemy.position);
            gridSquare.setCharacter(null);
            this.changes.push(gridSquare);
            this.enemies = this.enemies.filter(character => !character.position.equals(enemy.position));
            PubSub.publish(EnemyDeathEvent.create(enemy));
        };
        this.shoot = () => {
            const x = this.player.position.x;
            const enemyHit = this.enemies.filter(enemy => enemy.position.x === x)
                ?.reduce((accumulator, enemy) => {
                accumulator = accumulator === null ? enemy : accumulator;
                return enemy.position.y > accumulator.position.y ? enemy : accumulator;
            }, null);
            if (!enemyHit) {
                return;
            }
            enemyHit.reduceHealth(1);
            if (enemyHit.isDead()) {
                this.removeEnemy(enemyHit);
            }
        };
        this.spawnEnemy = () => {
            const position = this.findEmptySpawn();
            const gridSquare = this.getGridSquare(position);
            const rand = Math.floor(Math.random() * 3);
            const enemy = rand % 2 === 0 && rand != 0 ? new Knight(position, 1) : new Pawn(position, 1);
            gridSquare && gridSquare.setCharacter(enemy);
            gridSquare && this.changes.push(gridSquare);
            enemy.setPosition(enemy.position);
            this.enemies.push(enemy);
        };
        this.moveEnemies = () => {
            this.enemies.forEach((enemy) => {
                if (!enemy.position)
                    return;
                if (enemy.position.y >= 14 && enemy.movement.y > 0) {
                    pubsub.publish(new GameOverEvent());
                    return;
                }
                const oldGrid = this.getGridSquare(enemy.position);
                oldGrid.removeCharacter();
                const allowed = enemy.possiblePositions.filter((p) => {
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
        };
        this.spawnBoss = () => {
            this.enemies.push(new King(new Position(4, 0), 10));
        };
        this.afterRoundActions = () => {
            this.moveEnemies();
            if (this.enemies.length < 3) {
                this.spawnEnemy();
            }
            this.updateGrid();
        };
        this.updateGrid = () => {
            PubSub.publish(GameUpdateEvent.create(this.changes));
            this.changes = [];
        };
        this.end = () => {
            this.enemies = [];
            this.enemies.forEach((enemy) => {
                this.changes.push(this.getGridSquare(enemy.position));
            });
        };
        this.buildGrid = () => {
            for (let y = 0; y <= 15; y++) {
                for (let x = 0; x <= 9; x++) {
                    this.grid.push(new GridSquare(x, y));
                }
            }
        };
        this.getGridSquare = (position) => {
            const index = position.y * 10 + position.x;
            return this.grid[index] ?? null;
        };
        this.isValidPosition = (position) => {
            return position.x >= 0 && position.x <= 9 && position.y >= 0 && position.y <= 15;
        };
        PubSub.subscribe(RoundSkipEvent.EVENTNAME, this.afterRoundActions);
        this.player = new Player();
        this.buildGrid();
        this.spawnPlayer();
        this.spawnEnemy();
        this.updateGrid();
    }
    findEmptySpawn() {
        const x = Math.floor(Math.random() * 10);
        const y = 0;
        const position = new Position(x, y);
        const square = this.getGridSquare(position);
        if (!square || !square.isEmpty()) {
            this.findEmptySpawn();
        }
        return position;
    }
}
