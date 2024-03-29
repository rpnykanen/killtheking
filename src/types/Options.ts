interface Options {
  controls: Controls,
  gridOptions: GridOptions,
  difficulty: Difficulty[]
}
interface Controls {
  left:  string;
  right: string;
  shoot: string;
  skip:  string;
  reset: string;
}
interface Difficulty {
  roundLength: number; // Length of the round in ms.
  enemyHealth: number; // How many hits enemies endure.
  bossHealth:  number; // How many hits the boss endures.
  enemyAmount: number; // How many enemies before boss spawn.
}
interface GridOptions {
  width:  number; // How many gridsquares on grid.
  height: number; // How many gridsquares on grid.
  gridSquareWidth: number; // Single square size.
  gridSquareHeight: number; // Single square size.
  iconWidth: number; // Width of the character drawn on grid.
  iconHeight: number; // Height of the character drawn on grid.
  elementId: string; // Html element wrapper for the canvases.
  gameCanvas: string; // Id for the game canvas.
  effectCanvas: string; // Id for the effect canvas.
}

export {Options, Controls, Difficulty, GridOptions}