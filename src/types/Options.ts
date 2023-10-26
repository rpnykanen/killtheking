export interface Options {
  controls:    Controls;
  difficulty:  Difficulty;
  gridOptions: GridOptions;
}

export interface Controls {
  left:  string;
  right: string;
  shoot: string;
  skip:  string;
}

export interface Difficulty {
  easy:   Easy;
  normal: Normal;
}

export interface Easy {
  roundLength: number;
  enemyHealth: number;
  bossHealth:  number;
}

export interface Normal {
  roundlength: number;
  enemyHealth: number;
  bossHealth:  number;
}

export interface GridOptions {
  width:  number;
  height: number;
}
