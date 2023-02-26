import Game from "./Game.js";
const game = new Game();

document.addEventListener("keydown", (keydownEvent) => {
    game.event(keydownEvent.key);
});
