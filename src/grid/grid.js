import Enemy from "../character/enemy.js";
import Knight from "../character/knight.js";
import Pawn from "../character/pawn.js";

import GridSquare from "./gridSquare.js";

export default class Grid {
    constructor(player, manager, renderer){
        this.player = player;
        this.enemies = [];
        this.manager = manager;
        this.renderer = renderer
    }

    initialize() {
        this.squareWidth = 40;
        this.squareHeight = 40;
        this.grid = [];
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y <= 15; y++){
                this.grid.push(new GridSquare(x, y));
            }
        }
        
        const positionX = Math.floor(Math.random() * 10);
        const enemy = new Pawn(positionX,0,1);
        this.#addCharacter(enemy);
        this.enemies.push(enemy);

        this.getGridSquare(...Object.values(this.player.getPosition()))
            .setObject(this.player);
        this.renderer.drawGrid();
        this.#updateGrid();
    }

    action = (action) => {
        if (action == 'left' || action == 'right') {
            this.#movePlayer(action);
        } 

        if (action == 'up') {
           this.#shoot();
        }

        this.#removeCharacters();
        this.#moveEnemies();
        this.#spawnEnemies();
        this.#updateGrid();
    }

    #updateGrid = () => {
        this.grid.forEach((gridSquare) => {
            this.renderer.updateGrid(gridSquare);
        });
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
            this.getGridSquare(...Object.values(enemy.getPosition())).setObject(enemy);
            this.enemies.push(enemy);
        }
    }

    #moveEnemies = () => {
        if (this.enemies.length == 0) return;
        
        const predict = this.enemies.filter(enemy => enemy.getState() === Enemy.PredictState)
        const move = this.enemies.filter(enemy => enemy.getState() === Enemy.MoveState);
        predict.forEach((enemy) => {
            const movements = enemy.getMovement();
            const prediction = movements.reduce((accumulator, movement) => {
                accumulator.y += movement.y;
                


                if (enemy.getPosition()['x'] == 0) {
                    accumulator.x = accumulator.x += movement.x;
                } else if (enemy.getPosition()['x'] == 9) {
                    accumulator.x = accumulator.x -= movement.x;
                } else {
                    let x = movement.x;
                    if (x != 0) {
                        const rand = Math.floor(Math.random() * 2);
                        x = rand % 2 === 0 ? x*-1 : x;
                    }
                    accumulator.x = accumulator.x += x;
                } 

                
                return accumulator;
            }, enemy.getPosition());
            enemy.predictPosition(prediction.x, prediction.y);
        });
        
        move.forEach((enemy) => {
            enemy.moveToPredictedPosition();
            this.#moveCharacter(enemy);
        })
    }

    #moveCharacter = (character) => {
        this.getGridSquare(...Object.values(character.getOldPosition())).setObject(null);
        this.#addCharacter(character)
    }

    #addCharacter = (character) => {
        this.getGridSquare(...Object.values(character.getPosition())).setObject(character);
    }

    #removeCharacters = () => {
        const deadEnemies = this.enemies.filter(enemy => enemy.isDead())
        .forEach((enemy) => {
            this.getGridSquare(...Object.values(enemy.getPosition())).setObject(null);
        });
        this.enemies = this.enemies.filter(enemy => !enemy.isDead());
    }

    #movePlayer = (action) => {
        this.player[action]();
        this.getGridSquare(...Object.values(this.player.getOldPosition())).setObject(null);
        this.getGridSquare(...Object.values(this.player.getPosition())).setObject(this.player);
    }

    #shoot = () => {
        const {x} = this.player.getPosition();
        const enemyHit = this.enemies.filter(enemy => enemy.getPosition()['x'] === x)
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

    getGridSquare = (x,y) => this.grid.find(square => square.getX() == x && square.getY() == y)
}