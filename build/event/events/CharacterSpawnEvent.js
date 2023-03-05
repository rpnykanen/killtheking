export default class CharacterSpawnEvent {
    constructor(_character) {
        this._character = _character;
    }
    get character() { return this._character; }
    get eventName() { return CharacterSpawnEvent.EVENTNAME; }
}
CharacterSpawnEvent.EVENTNAME = 'character.spawn';
CharacterSpawnEvent.create = (character) => new CharacterSpawnEvent(character);
