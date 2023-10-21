import Container from "./Container.js";
import Game from "./Game.js";

const container = new Container();

const game = new Game(
  container.grid,
  container.renderer,
  container.state
);

document.addEventListener("keyup", (keyUpEvent) => {
  game.handleAction(keyUpEvent.key);
});
