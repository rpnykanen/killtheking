import Position from "../grid/Position";

export default interface Character {

    get Position(): Position;

    get OldPosition(): Position | null;

    get IconName(): string

    get icon(): string;

    get iconSize(): object;

}