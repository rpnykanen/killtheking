import GridSquare from "./GridSquare";
import Position from "./Position";
import { GridOptions } from "../types/Options";
import { randomNumber } from "../utils/RandomHelper";

export default class Grid {

  private grid: GridSquare[] = [];

  constructor(private gridOptions: GridOptions) {
    this.buildGrid();
  }

  private buildGrid = (): void => {
    for (let height = 0; height <= this.gridOptions.height; height++) {
      for (let width = 0; width < this.gridOptions.width; width++) {
        const position = new Position(width,height);
        this.grid.push(new GridSquare(position));
      }
    }
  }

  public getGridSquare = (position: Position): GridSquare => {
    const index = position.y * this.gridOptions.width + position.x;
    return this.grid[index] ?? GridSquare.create();
  }

  public isValidPosition = (position: Position): boolean => {
    return position.x >= 0 && position.x < this.gridOptions.width &&
      position.y >= 0 && position.y <= this.gridOptions.height;
  }

  public isEmpty = (position: Position): boolean => {
    return this.getGridSquare(position).isEmpty();
  }

  public isOutOfBoundsX = (position: Position): boolean => {
    return position.x >= this.gridOptions.width;
  }

  public isOutOfBoundsY = (position: Position): boolean => {
    return position.y >= this.gridOptions.height;
  }

  public getEmptySpawn = (): GridSquare => {
    const empties = this.grid.slice(0, (this.getMaxX))
      .filter((gridSquare: GridSquare) => gridSquare.isEmpty());
    return empties[randomNumber(empties.length-1)];
  }

  get getMaxX(): number { return this.gridOptions.width -1; }

}