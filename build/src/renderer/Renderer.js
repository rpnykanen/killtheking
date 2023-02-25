export default class Renderer {
    constructor() {
        this.drawGrid = () => {
            const padding = Renderer.padding;
            const width = Renderer.width;
            const height = Renderer.height;
            for (let x = 0; x <= width; x += 40) {
                this.context?.moveTo(0.5 + x + padding, padding);
                this.context?.lineTo(0.5 + x + padding, height + padding);
            }
            for (let x = 0; x <= height; x += 40) {
                this.context?.moveTo(padding, 0.5 + x + padding);
                this.context?.lineTo(width + padding, 0.5 + x + padding);
            }
            //this.context?.strokeStyle = "black";
            this.context?.stroke();
        };
        const canvas = document.getElementById("game");
        this.context = canvas.getContext("2d");
        this.drawGrid();
    }
}
Renderer.width = 400;
Renderer.height = 600;
Renderer.padding = 10;
