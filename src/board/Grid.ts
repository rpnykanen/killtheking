import GridSquare from "./GridSquare";
import Position from "./Position";
import { GridOptions } from "../types/Options";
import { randomNumber } from "../utils/RandomHelper";

export default class Grid {

  private grid: GridSquare[] = [];

  constructor(private gridOptions: GridOptions) {
    this.grid = [];
    this.buildGrid();
  }

  public initialize = () => {
    // this.grid = [];
    //this.buildGrid();
  }

  private buildGrid = (): void => {
    for (let height = 0; height <= this.gridOptions.height; height++) {
      for (let width = 0; width < this.gridOptions.width; width++) {
        const position = new Position(width,height);
        this.grid.push(new GridSquare(position));
      }
    }
  }

  // Can I expect it to be valid or throw error if ..?
  public isEmpty = (position: Position): boolean => {
    return this.getGridSquare(position).isEmpty();
  }

  public isValidPosition = (position: Position): boolean => {
    return position.x >= 0 && position.x < this.gridOptions.width &&
      position.y >= 0 && position.y <= this.gridOptions.height;
  }

  public isOutOfBoundsX = (position: Position): boolean => {
    return position.x >= this.gridOptions.width;
  }

  public isOutOfBoundsY = (position: Position): boolean => {
    return position.y >= this.gridOptions.height;
  }

  public getGridSquare = (position: Position): GridSquare => {
    const index = position.y * this.gridOptions.width + position.x;
    return this.grid[index] ?? GridSquare.create();
  }

  public getEmptySpawn = (): GridSquare => {
    const empties = this.grid.slice(0, (this.gridOptions.width-1))
      .filter((gridSquare: GridSquare) => gridSquare.isEmpty());
    return empties[randomNumber(empties.length-1)];
  }

}