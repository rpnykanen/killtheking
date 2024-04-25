import GridSquare from "./GridSquare";
import Position from "./Position";
import { GridConfiguration } from "../types/Configurations";
import { randomNumber } from "../utils/RandomHelper";

export default class Grid {

  private grid: GridSquare[] = [];

  constructor(private gridConfiguration: GridConfiguration) {
    this.buildGrid();
  }

  private buildGrid = (): void => {
    for (let height = 0; height <= this.gridConfiguration.height; height++) {
      for (let width = 0; width < this.gridConfiguration.width; width++) {
        const position = new Position(width,height);
        this.grid.push(new GridSquare(position));
      }
    }
  }

  public getGridSquare = (position: Position): GridSquare => {
    const index = position.y * this.gridConfiguration.width + position.x;
    return this.grid[index] ?? GridSquare.create();
  }

  public isValidPosition = (position: Position): boolean => {
    return position.x >= 0 && position.x < this.gridConfiguration.width &&
      position.y >= 0 && position.y <= this.gridConfiguration.height;
  }

  public isEmpty = (position: Position): boolean => {
    return this.getGridSquare(position).isEmpty();
  }

  public isOutOfBoundsX = (position: Position): boolean => {
    return position.x >= this.gridConfiguration.width;
  }

  public isOutOfBoundsY = (position: Position): boolean => {
    return position.y >= this.gridConfiguration.height;
  }

  public getEmptySpawn = (): GridSquare => {
    const empties = this.grid.slice(0, (this.getMaxX))
      .filter((gridSquare: GridSquare) => gridSquare.isEmpty());
    return empties[randomNumber(empties.length-1)];
  }

  get getMaxX(): number { return this.gridConfiguration.width -1; }

}