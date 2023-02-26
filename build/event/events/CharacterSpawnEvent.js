export default class CharacterSpawnEvent {
    constructor(character) {
        this.character = character;
        this.getCharacter = () => this.character;
    }
}
CharacterSpawnEvent.eventName = 'character.spawn';
CharacterSpawnEvent.create = (character) => {
    return new CharacterSpawnEvent(character);
};
