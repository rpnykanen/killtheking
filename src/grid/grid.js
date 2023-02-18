import Enemy from "../character/enemy.js";
import Knight from "../character/knight.js";
import Pawn from "../character/pawn.js";
import GridSquare from "./gridSquare.js";
import pubsub from "../event/pubSub.js";

export default class Grid {

    constructor(player, renderer){
        this.player = player;
        this.enemies = [];
        this.renderer = renderer
        this.actions = [];
        pubsub.subscribe('player.move', this.#move);
        pubsub.subscribe('player.shoot', this.#shoot);
        pubsub.subscribe('player.skip', this.#genericActions);
        pubsub.subscribe('enemy.death', this.#removeEnemy)
    }

    initialize = () => {
        this.grid = [];
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y <= 15; y++){
                this.grid.push(new GridSquare(x, y));
            }
        }
        
        const x = Math.floor(Math.random() * 10);
        const enemy = new Pawn(x,0,1);

        this.getGridSquare(enemy.getPosition()).setObject(enemy);

        this.enemies.push(enemy);

        this.getGridSquare(this.player.getPosition())
            .setObject(this.player);

        this.renderer.drawGrid();
        this.renderer.updateGrid(this.getGridSquare(this.player.getPosition()));
    }

    #genericActions = () => {
        this.#moveEnemies();
        this.#spawnEnemies();
        this.#performActions();
    }

    #removeEnemy = (position) => {
        this.actions.push(position);
        this.getGridSquare(position).setObject(null); 
        this.enemies = this.enemies.filter(enemy => !enemy.isDead());
    }

    #move = (positions) => {
        this.actions.push(...Object.values(positions))

        const {oldPos, newPos} = positions;
        const character = this.getGridSquare(oldPos).getObject();
        this.getGridSquare(oldPos).setObject(null);
        if (character) this.getGridSquare(newPos).setObject(character);

        this.#genericActions();
    }

    #shoot = (position) => {
        const x = position.getX();

        const enemyHit = this.enemies.filter(enemy => enemy.getPosition()['x'] === x)
            ?.reduce((accumulator, enemy)=> {
                if (accumulator === null) {
                    accumulator = enemy;
                } else {
                    accumulator = enemy.getPosition()['y'] > accumulator.getPosition()['y'] ? enemy : accumulator; 
                }
                return accumulator;
            }, null)

        if (enemyHit) enemyHit.reduceHealth(1);

        this.#genericActions();
    }
    
    #performActions = () => {
        const actions = this.actions;
        actions.forEach((position) => {
            this.renderer.updateGrid(this.getGridSquare(position));
        });
        this.actions = [];
    }
    
    #spawnEnemies = () => {
        if (this.enemies.length < 3) {
            const positionX = Math.floor(Math.random() * 10);
            const positionY = 0;

            const rand = Math.floor(Math.random() * 3);
            let enemy = null;
            if (rand % 2 === 0 && rand != 0) {
                enemy = new Knight(positionX, positionY, 1);
            } else {
                enemy = new Pawn(positionX, positionY, 1);
            }
            this.getGridSquare(enemy.getPosition()).setObject(enemy);
            this.enemies.push(enemy);
        }
    }

    #moveEnemies = () => {
        if (this.enemies.length == 0) return;
        
        const predict = this.enemies.filter(enemy => enemy.getState() === Enemy.PredictState)
        const move = this.enemies.filter(enemy => enemy.getState() === Enemy.MoveState);

        predict.forEach((enemy) => {
            const movements = enemy.getMovement();
            const enemyPosition = enemy.getPosition().clone();
            const prediction = movements.reduce((accumulator, movement) => {
                accumulator.addY(movement.getY());

                if (enemyPosition.getX() == 0) {
                    accumulator.x = accumulator.x += movement.x;
                } else if (enemyPosition.getX() == 9) {
                    accumulator.x = accumulator.x -= movement.x;
                } else {
                    let x = movement.x;
                    if (x != 0) {
                        const rand = Math.floor(Math.random() * 2);
                        x = rand % 2 === 0 ? x*-1 : x;
                    }
                    accumulator.addX(x);
                } 
                
                return accumulator;
            }, enemy.getPosition().clone());
            enemy.predictPosition(prediction);
            this.actions.push(enemy.getPosition());
        });
        
        move.forEach((enemy) => {
            enemy.moveToPredictedPosition();
            this.#moveCharacter(enemy);
            this.actions.push(enemy.getOldPosition(), enemy.getNewPosition())
        })
    }

    
    #moveCharacter = (character) => {
        this.getGridSquare(character.getOldPosition()).setObject(null);
        this.getGridSquare(character.getPosition()).setObject(character);
    }



    getGridSquare = (position) => this.grid.find(square => square.position.equals(position))
}