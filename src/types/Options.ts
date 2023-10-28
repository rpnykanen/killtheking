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
  width:  number;
  height: number;
}

export {Options, Controls, Difficulty, GridOptions}