import Character from "../../character/Character";
import Position from "../../grid/Position";

export default class CharacterSpawnEvent implements IEvent {
    static EVENTNAME: string = 'character.spawn';

    constructor(private _character: Character) {}

    static create = (character: Character) => new CharacterSpawnEvent(character);

    get character(): Character { return this._character; }

    get eventName() { return CharacterSpawnEvent.EVENTNAME; }
}