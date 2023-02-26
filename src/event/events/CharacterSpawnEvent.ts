import Character from "../../character/Character";
import Position from "../../grid/Position";

export default class CharacterSpawnEvent implements IEvent {
    static eventName: string = 'character.spawn';

    constructor(private character: Character) {
    }

    static create = (character: Character) => {
        return new CharacterSpawnEvent(character);
    }

    public getCharacter = (): Character => this.character;
}