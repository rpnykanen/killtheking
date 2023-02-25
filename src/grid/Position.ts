export default class Position {
    constructor(private x: number, private y: number){
    }
    getX = () => this.x;
    getY = () => this.y;
    equals = (position: Position) => this.x === position.getX() && this.y === position.getY();
}