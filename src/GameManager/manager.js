import Pawn from "../enemy/pawn.js";
import Enemy from "../enemy/enemy.js";

export default class Manager {
    constructor(grid) {
        this.enemies = [];
        this.grid = grid;
    }

    update() {
        this.removeEnemies();
        this.updateEnemyPosition();
        this.spawnEnemies();
    }

    removeEnemies = () => {
        if (this.enemies.length == 0) return;
        this.enemies.filter(enemy => enemy.getHealth() <= 0)
            .forEach(enemy => destroy(enemy));
    }

    updateEnemyPosition = () => {
        if (this.enemies.length == 0) return;
        
        const predict = this.enemies.filter(enemy => enemy.getState() === Enemy.PredictState)
        const move = this.enemies.filter(enemy => enemy.getState() === Enemy.MoveState);

        predict.forEach((enemy) => {
            const movements = enemy.getMovement();
            const {x, y} = enemy.getPosition();
            const prediction = movements.reduce((accumulator, movement)=>{
                accumulator.x += movement.x;
                accumulator.y += movement.y;
                return accumulator;
            }, {"x": x, "y": y});
            //const square = this.grid.getGridSquare(...prediction);
            enemy.predictPosition(prediction.x, prediction.y);
        });
        
        move.forEach((enemy) => {
            enemy.moveToPredictedPosition();
        })

    }

    spawnEnemies = () => {
        if (this.enemies.length < 3) {
            const position = Math.floor(Math.random() * 10);
            const enemy = new Pawn(position, 0, 1);
            this.enemies.push(enemy);
        }
        console.log(this.enemies);
    }

    getEnemies = () => this.enemies;

}