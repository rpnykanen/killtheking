import {describe, expect, test} from "@jest/globals";
import CanvasPosition from "@renderer/CanvasPosition";
import PositionConverter from "@renderer/PositionConverter";

describe('Canvas position and mapper test', () => {
  const gridConfiguration = {
    "width": 5,
    "height": 10,
    "gridSquareWidth": 40,
    "gridSquareHeight": 40,
    "iconHeight": 25,
    "iconWidth": 20,
    "elementId": "game-container",
    "gameCanvas": "game",
    "effectCanvas": "effect"
  };

  const mapper = new PositionConverter(gridConfiguration);

  test('Canvas position', ()=>{
    const canvasPosition: CanvasPosition = mapper.map(1,2,null);
    expect(canvasPosition.isEmpty()).toBeTruthy();
    expect(canvasPosition.iconPositionX).toBe(40);
    expect(canvasPosition.iconPositionY).toBe(80);
  });

});