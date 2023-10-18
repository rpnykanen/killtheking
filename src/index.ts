import Game from "./Game.js";
const game = new Game();

document.addEventListener("keyup", (keyUpEvent) => {
  game.action(keyUpEvent.key);
});
