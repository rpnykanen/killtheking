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
}
interface Difficulty {
  roundLength: number;
  enemyHealth: number;
  bossHealth:  number;
}
interface GridOptions {
  width:  number; // how many gridsquares on grid
  height: number; // how many gridsquares on grid
  gridSquareWidth: number; // single square size
  gridSquareHeight: number; // single square size
  elementId: string; // html element id to render the game
  gameCanvas: string;
  effectCanvas: string;
}

export {Options, Controls, Difficulty, GridOptions}