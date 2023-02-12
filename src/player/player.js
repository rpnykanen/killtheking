export default class Player {
    
    static Y = 0;

    static iconHeight = 30;
    static iconWidth = 30;

    constructor() {
        this.x = 0;
        this.y = 15
        this.oldX = 0;
        this.oldY = 15;
    }

    right = () => {
        this.oldX = this.x;
        this.x += this.x < 9 ? 1 : 0;
    }

    left = () => {
        this.oldX = this.x;
        this.x -= this.x > 0 ? 1: 0;
    }

    getIconSize = () => {
        return {"height": Player.iconHeight, "width": Player.iconWidth}
    }

    getPosition = () => { return {"x": this.x, "y": this.y}; }

    getOldPosition = () => { return {"oldX": this.oldX, "oldY": this.oldY}; }

    getIconName = () => "player.svg";

    setIcon = (icon) => { this.icon = icon}

    getIcon = () => this.icon;

}