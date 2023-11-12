import CanvasPosition from "./CanvasPosition.js";
export default class CanvasPositionMapper {
    constructor(gridOptions) {
        this.gridOptions = gridOptions;
        this.map = (x, y, icon) => {
            const canvasX = x * this.gridOptions.gridSquareWidth + 15;
            const canvasY = y * this.gridOptions.gridSquareHeight + 15;
            return new CanvasPosition(canvasX, canvasY, icon);
        };
    }
}
