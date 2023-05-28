import PlayerMoveEvent from "../event/events/PlayerMoveEvent.js";
import CharacterSpawnEvent from "../event/events/CharacterSpawnEvent.js";
import GameUpdateEvent from "../event/events/GameUpdateEvent.js";
import PlayerShootEvent from "../event/events/PlayerShootEvent.js";
import EnemyDeathEvent from "../event/events/EnemyDeathEvent.js";
import Enemy from "../character/Enemy.js";
import GridSquare from "./GridSquare.js";
import PubSub from "../event/PubSub.js";
import Position from "./Position.js";
import Pawn from "../character/Pawn.js";
import Knight from "../character/Knight.js";
import RoundSkipEvent from "../event/events/RoundSkipEvent.js";
export default class Grid {
    constructor() {
        this.grid = [];
        this.enemies = [];
        this.changes = [];
        this.spawn = (spawnEvent) => {
            const character = spawnEvent.character;
            const position = character.position;
            this.getGridSquare(position)?.removeCharacter();
            const square = this.getGridSquare(position);
            if (!square) {
                return;
            }
            square.setCharacter(character);
            this.changes.push(square);
        };
        this.removeEnemy = (enemyDeathEvent) => {
            const deadEnemy = enemyDeathEvent.enemy;
            const gridSquare = this.getGridSquare(deadEnemy.position);
            gridSquare.setCharacter(null);
            this.changes.push(gridSquare);
            this.enemies = this.enemies.filter(enemy => !enemy.position.equals(enemyDeathEvent.enemy.position));
            this.genericActions();
        };
        this.shoot = (shoot) => {
            const x = shoot.position.x;
            const enemyHit = this.enemies.filter(enemy => enemy.position.x === x)
                ?.reduce((accumulator, enemy) => {
                accumulator = accumulator === null ? enemy : accumulator;
                return enemy.position.y > accumulator.position.y ? enemy : accumulator;
            }, null);
            if (enemyHit) {
                enemyHit.reduceHealth(1);
            }
            else {
                this.genericActions();
            }
        };
        this.updateGrid = () => {
            PubSub.publish(GameUpdateEvent.create(this.changes));
        };
        this.move = (playerMoveEvent) => {
            const oldPos = playerMoveEvent.oldPosition;
            const newPos = playerMoveEvent.newPosition;
            const oldGrid = this.getGridSquare(oldPos);
            const character = oldGrid.character;
            if (!character) {
                return;
            }
            oldGrid.removeCharacter();
            const newGrid = this.getGridSquare(newPos);
            newGrid?.setCharacter(character);
            this.changes.push(oldGrid, newGrid);
            this.genericActions();
        };
        this.genericActions = () => {
            this.moveEnemies();
            this.spawnEnemy();
            PubSub.publish(GameUpdateEvent.create(this.changes));
        };
        this.moveEnemies = () => {
            if (this.enemies.length == 0)
                return;
            const predict = this.enemies.filter(enemy => enemy.state === Enemy.PredictState);
            const move = this.enemies.filter(enemy => enemy.state === Enemy.MoveState);
            predict.forEach((enemy) => {
                const movement = enemy.movement;
                const enemyPosition = enemy.position;
                let x = enemyPosition.x;
                let y = enemyPosition.y;
                y += movement.y;
                if (x == 0) {
                    x += movement.x;
                }
                else if (enemyPosition.x == 9) {
                    x -= movement.x;
                }
                else {
                    let movementX = movement.x;
                    if (movementX != 0) {
                        const rand = Math.floor(Math.random() * 2);
                        movementX = rand % 2 === 0 ? movementX * -1 : movementX;
                    }
                    x += movementX;
                }
                enemy.predictPosition(new Position(x, y));
            });
            move.forEach((enemy) => {
                const oldGrid = this.getGridSquare(enemy.oldPosition);
                const grid = this.getGridSquare(enemy.position);
                const newGrid = this.getGridSquare(enemy.newPosition);
                oldGrid.removeCharacter();
                grid.removeCharacter();
                if (newGrid.character && newGrid.character instanceof Enemy) {
                    newGrid.character.reduceHealth(1);
                }
                newGrid.setCharacter(enemy);
                this.changes.push(oldGrid, newGrid, grid);
                enemy.moveToPredictedPosition();
            });
        };
        this.spawnEnemy = () => {
            if (this.enemies.length < 3) {
                const x = Math.floor(Math.random() * 10);
                const y = 0;
                const rand = Math.floor(Math.random() * 3);
                let enemy = null;
                if (rand % 2 === 0 && rand != 0) {
                    enemy = new Knight(x, y, 1);
                }
                else {
                    enemy = new Pawn(x, y, 1);
                }
                const gridSquare = this.getGridSquare(enemy.position);
                gridSquare.setCharacter(enemy);
                this.changes.push(gridSquare);
                this.enemies.push(enemy);
            }
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
            return this.grid[index];
        };
        PubSub.subscribe(CharacterSpawnEvent.EVENTNAME, this.spawn);
        PubSub.subscribe(PlayerMoveEvent.EVENTNAME, this.move);
        PubSub.subscribe(PlayerShootEvent.EVENTNAME, this.shoot);
        PubSub.subscribe(EnemyDeathEvent.EVENTNAME, this.removeEnemy);
        PubSub.subscribe(RoundSkipEvent.EVENTNAME, this.genericActions);
        this.buildGrid();
        this.gridInitialState();
    }
    gridInitialState() {
        this.spawnEnemy();
    }
}
