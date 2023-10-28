export default class Controller {
    constructor(controls) {
        this.controls = controls;
        this.handleAction = (keyUp) => {
            const key = keyUp.key;
            switch (key) {
                case this.controls.left:
                    this._move(true);
                    break;
                case this.controls.right:
                    this._move(false);
                    break;
                case this.controls.shoot:
                    this._shoot();
                    break;
                case this.controls.skip:
                    this._skip();
                    break;
            }
        };
        document.addEventListener('keyup', this.handleAction);
    }
    set move(move) { this._move = move; }
    set shoot(shoot) { this._shoot = shoot; }
    set skip(skip) { this._skip = skip; }
}
