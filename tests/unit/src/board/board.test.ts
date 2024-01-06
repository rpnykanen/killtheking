import {describe, expect, test} from "@jest/globals"
import Grid from "@board/Grid";
import GridSquare from "@board/GridSquare";
import Position from "@board/Position"

describe('Position', () => {
  const position1 = new Position(1,2);
  const position2 = Position.createNullPosition();
  const position3 = position1.clone();

  test('Test position null values', () => {
    expect(position1.notNull()).toBeTruthy();
    expect(position3.notNull()).toBeTruthy();

    expect(position2.notNull()).toBeFalsy();   
  });

  test('Test position equality', () => {
    expect(position1.equals(position3)).toBeTruthy();

    expect(position1.equals(position2)).toBeFalsy();
  });

  test('Test position changing', () => {
    position3.addX();
    expect(position1.equals(position3)).toBeFalsy();
    expect(position3.x).toBe(2);

    position3.substractX();
    expect(position3.x).toBe(1);
    expect(position1.equals(position3)).toBeTruthy();
  })
});

describe('GridSquare', () => {
  const position = new Position(1,1);
  const gridSquare = new GridSquare(position);
  
  test('Null grid', () => {
    const nullGridsquare = GridSquare.create();
    expect(nullGridsquare.isEmpty()).toBeTruthy();
    expect(nullGridsquare.notNull()).toBeFalsy();
    expect(nullGridsquare.icon).toBeNull();
  });

  test('Grid square values', () => {
    expect(position.equals(gridSquare.position)).toBeTruthy();
  });
});

describe('Grid', () => {
  const gridOptions = {
    "width": 5,
    "height": 10,
    "gridSquareWidth": 40,
    "gridSquareHeight": 40,
    "iconHeight": 25,
    "iconWidth": 20,
    "elementId": "game-container",
    "gameCanvas": "game",
    "effectCanvas": "effect"
  }
  const {width, height} = gridOptions;

  const grid = new Grid(gridOptions);
 
  const nullPosition = Position.createNullPosition();
  const badPosition = new Position(99,99);
  const lastPosition = new Position(width-1, height-1);

  test('GridSquare valid positions', () => {
    expect(grid.isValidPosition(nullPosition)).toBeFalsy();
    expect(grid.isValidPosition(lastPosition)).toBeTruthy();
    expect(grid.isValidPosition(badPosition)).toBeFalsy();
  });

  test('Get last gridSquare from grid', () => {
    const gridSquare = grid.getGridSquare(lastPosition);
    expect(gridSquare.x).toBe(width-1);
    expect(gridSquare.y).toBe(height-1);
  });

  test('get NullGridSquare from grid', () => {
    const nullGridSquare = grid.getGridSquare(badPosition);
    expect(nullGridSquare.notNull()).toBeFalsy();
  })

  test('Grid bounds', () => {
    expect(grid.isEmpty(lastPosition)).toBeTruthy();
    expect(grid.isOutOfBoundsX(badPosition)).toBeTruthy();
    expect(grid.isOutOfBoundsY(badPosition)).toBeTruthy();

    expect(grid.isOutOfBoundsX(lastPosition)).toBeFalsy();
    expect(grid.isOutOfBoundsY(lastPosition)).toBeFalsy();
  });

  test('Grid spawn', () => {
    const emptyGridSquare = grid.getEmptySpawn()
    expect(emptyGridSquare.isEmpty()).toBeTruthy();
  })

});