import Game from "./src/game.js";

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

context.font='14px FontAwesome';

const game = new Game(context);
game.initialize();

document.onkeydown = (e) => {
    e = e || window.event;

    if (e.keyCode == '37') { game.player.left(); console.log('left');     game.update();}
    // right
    if (e.keyCode == '39') { game.player.right(); console.log('right'); game.update();}

    // up
    if (e.keyCode == '38') { /*game. */ /*console.log('up')*/}
    if (e.keyCode == '40') { game.update(); console.log('skip');}

}
