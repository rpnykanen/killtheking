export default class GridSquare {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isEmpty = true;
    }

    getUp = () => {
        if (this.x == 0) return false;
        return this.x - 1;
    }

    getDown = () => {
        if (this.x == 15) return false;
        return this.x + 1;
    }

    getLeft = () => {
        if (this.y == 0) return false;
        return this.y - 1;
    }

    getRight = () => {
        if (this.y == 10) return false;
        return this.y + 1;
    }

    getX = () => this.x;

    getY = () => this.y;

    getIsEmpty = () => this.isEmpty;

    setIsEmpty = (empty) => {
        this.isEmpty = empty;
    }

}