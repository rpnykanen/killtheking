export default interface Configuration {
  controls: Controls,
  gridConfiguration: GridConfiguration,
  difficulty: Difficulty[],
  misc: Misc,
  hs: string[]
}
export interface Controls {
  [key: string]: string
  left:  string;
  right: string;
  shoot: string;
  skip:  string;
  reset: string;
}
export interface Difficulty {
  [key: string]: number;
  roundLength: number; // Length of the round in ms.
  enemyHealth: number; // How many hits enemies endure.
  bossHealth:  number; // How many hits the boss endures.
  enemyAmount: number; // How many enemies before boss spawn.
  maxEnemies: number;
}
export interface GridConfiguration {
  [key: string]: number|string;
  width:  number; // How many gridsquares on grid.
  height: number; // How many gridsquares on grid.
  gridSquareWidth: number; // Single square size.
  gridSquareHeight: number; // Single square size.
  iconWidth: number; // Width of the character drawn on grid.
  iconHeight: number; // Height of the character drawn on grid.
  elementId: string; // Html element wrapper for the canvases.
}
export interface Misc {
  [key: string]: boolean
  autoplay: boolean,
  infinite: boolean,
}
