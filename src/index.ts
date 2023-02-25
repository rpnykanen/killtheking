import Game from "./Game.js";
const game = new Game();
document.onkeydown = (e) => {
    e = e || window.event;
    //game.event(e.keyCode);
};
