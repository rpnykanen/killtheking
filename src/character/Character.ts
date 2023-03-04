import Position from "../grid/Position.js";
import Icon from "./Icon.js";

export default interface Character {

    get position(): Position;

    get oldPosition(): Position;

    get icon(): Icon;

}