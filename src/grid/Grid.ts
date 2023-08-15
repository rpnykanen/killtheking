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

export default class Grid {

    private grid: GridSquare[] = [];

    private enemies: Enemy[] = [];

    private player: Player;

    private changes: GridSquare[] = [];

    constructor() {
        PubSub.subscribe(RoundSkipEvent.EVENTNAME, this.genericActions);
        // PubSub.subscribe(GameUpdateEvent.EVENTNAME, this.spawnEnemies);

        this.player = new Player();
        this.buildGrid()
        this.spawnPlayer();
        this.spawnEnemy();
        this.updateGrid();
    }

    public action = (action: string) => {
        this.changes = [];
        if (action == 'ArrowLeft' || action == 'ArrowRight') {
            this.player.updatePosition(action);
            this.movePlayer();
            this.genericActions();

        }
        if (action == 'ArrowUp') {
            this.shoot();
            this.genericActions();
        }
    }

    private spawnPlayer = () => {
        const square = this.getGridSquare(this.player.position)!;
        square.setCharacter(this.player);
        this.changes.push(square);
    }

    private movePlayer = () => {
        const oldPos = this.player.oldPosition;
        const newPos = this.player.position

        const oldGrid = this.getGridSquare(oldPos)!;
        const character = oldGrid.character;
        if (!character){
            return;
        }

        oldGrid.removeCharacter();
        const newGrid = this.getGridSquare(newPos)!;
        newGrid?.setCharacter(character);

        this.changes.push(oldGrid, newGrid);
    }

    private removeEnemy = (enemy: Enemy) => {
        const gridSquare = this.getGridSquare(enemy.position)!;
        gridSquare.setCharacter(null);
        this.changes.push(gridSquare);
        this.enemies = this.enemies.filter(character => !character.position.equals(enemy.position));
        PubSub.publish(EnemyDeathEvent.create(enemy));
    }

    private shoot = () => {
        const x = this.player.position.x;
        const enemyHit = this.enemies.filter(enemy => enemy.position.x === x)
            ?.reduce((accumulator: Enemy | null, enemy: Enemy)=> {
                accumulator = accumulator === null ? enemy : accumulator;
                return enemy.position.y > accumulator.position.y ? enemy : accumulator; 
            }, null)
            
        if (enemyHit) {
            enemyHit.reduceHealth(1);
            if (enemyHit.health <= 0) {
                this.removeEnemy(enemyHit);
            }
        }
    }

    public spawnEnemy = () => {
        if (this.enemies.length < 3) {
            const x = Math.floor(Math.random() * 10);
            const y = 0;

            const rand = Math.floor(Math.random() * 3);
            let enemy = null;
            if (rand % 2 === 0 && rand != 0) {
                enemy = new Knight(x, y, 1);
            } else {
                enemy = new Pawn(x, y, 1);
            }
            const gridSquare = this.getGridSquare(enemy.position);

            gridSquare.setCharacter(enemy);
            enemy.setPosition(enemy.position);
            this.changes.push(gridSquare);
            this.enemies.push(enemy);
            console.log(this.changes);
        }
    }

    private moveEnemies = () => {
        if (this.enemies.length == 0) return;

        this.enemies.forEach((enemy: Enemy) => {
            if (!enemy.position) return;

            let oldGrid = this.getGridSquare(enemy.position);
            oldGrid.removeCharacter();
            this.changes.push(oldGrid);
            
            const allowed = enemy.possiblePositions.filter((position: Position) => {
                return this.isValidPosition(position);
            });
            
            const position = allowed[Math.floor(Math.random()*allowed.length)];
            
            enemy.setPosition(position);
            const newGrid = this.getGridSquare(position);
            newGrid.setCharacter(enemy);

            this.changes.push(newGrid);    
        })
    }

    public spawnBoss = () => {
        this.enemies.push(new King(4,0,10));
    }

    private genericActions = () => {
        this.moveEnemies();
        this.spawnEnemy();
        PubSub.publish(GameUpdateEvent.create(this.changes));
    }

    public updateGrid = () => {
        PubSub.publish(GameUpdateEvent.create(this.changes));
    }

    private buildGrid = () => {
        for (let y = 0; y <= 15; y++) {
            for (let x = 0; x <= 9; x++){
                this.grid.push(new GridSquare(x, y));
            }
        }
    }

    private getGridSquare = (position: Position): GridSquare  => {
        const index = position.y*10+position.x;
        return this.grid[index];
    }

    private isValidPosition = (position: Position): boolean => {
        return position.x >= 0 && position.x <= 9 && position.y >= 0 && position.y <= 14;
    }

}