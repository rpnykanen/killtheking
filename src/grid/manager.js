import Pawn from "../character/pawn.js";
import Enemy from "../character/enemy.js";

export default class Manager {

    static events = {'37': 'left','38': 'up','39': 'right','40': 'down'};

    constructor(player) {
        this.enemies = [];
        this.player = player;
    }

    shoot = () => {
        const xPos = this.player.getPosition()['x'];
        const enemyHit = this.enemies.filter(enemy => enemy.getPosition()['x'] === xPos)
            ?.reduce((accumulator, enemy)=> {
                if (accumulator === null) {
                    accumulator = enemy;
                } else {
                    accumulator = enemy.getPosition()['y'] > accumulator.getPosition()['y'] ? enemy : accumulator; 
                }
                return accumulator;
            }, null)

        if (enemyHit) {
            enemyHit.reduceHealth(1);
        }
    }


    removeEnemies = () => {
        if (this.enemies.length == 0) return;
        this.enemies = this.enemies.filter(enemy => enemy.getHealth() > 0)
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

    getEnemies = () => {return this.enemies;}

}