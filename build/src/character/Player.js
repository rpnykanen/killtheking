import Position from "../grid/Position";
export default class Player {
    get Position() {
        return new Position(0, 15);
    }
    get OldPosition() {
        throw new Error("Method not implemented.");
    }
    get IconName() {
        throw new Error("Method not implemented.");
    }
    get icon() {
        throw new Error("Method not implemented.");
    }
    get iconSize() {
        throw new Error("Method not implemented.");
    }
}
