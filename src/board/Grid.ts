import GridSquare from "./GridSquare";
import Position from "./Position";
import { GridOptions } from "../types/Options";
import { randomNumber } from "../utils/RandomHelper";

export default class Grid {

  private grid: GridSquare[] = [];

  constructor(private gridOptions: GridOptions) {
  }

  public initialize = () => {
    this.buildGrid();
  }

  private buildGrid = () => {
    for (let y = 0; y <= this.gridOptions.height; y++) {
      for (let x = 0; x < this.gridOptions.width; x++) {
        const position = new Position(x,y);
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
    return this.grid[index] ?? GridSquare.createNullGrid();
  }

  public getEmptySpawn = (): GridSquare => {
    const empties = this.grid.slice(0, (this.gridOptions.width-1))
      .filter((gridSquare: GridSquare) => gridSquare.isEmpty());
    return empties[randomNumber(empties.length-1)];
  }

}