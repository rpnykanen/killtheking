export default class Character {

    getPosition = () => { return {"x": this.x, "y": this.y} };

    getOldPosition = () => { return {"oldX": this.oldX, "oldY": this.oldY} };

    getIconName = () => "player.svg";

    setIcon = icon => this.icon = icon;

    getIcon = () => this.icon;

    getIconSize = () => {return {"height": 20, "width": 20}}

}