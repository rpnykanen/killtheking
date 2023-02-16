export default class Character {

    getPosition = () => this.position;

    getOldPosition = () => this.oldPosition;

    getIconName = () => "player.svg";

    setIcon = icon => this.icon = icon;

    getIcon = () => this.icon;

    getIconSize = () => {return {"height": 20, "width": 20}}

}