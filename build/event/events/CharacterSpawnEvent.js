export default class CharacterSpawnEvent {
    constructor(_character) {
        this._character = _character;
    }
    get character() { return this._character; }
}
CharacterSpawnEvent.eventName = 'character.spawn';
CharacterSpawnEvent.create = (character) => {
    return new CharacterSpawnEvent(character);
};
