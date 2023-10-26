export default class Controller {
    constructor() {
        this.handleAction = (keyUp) => {
            const key = keyUp.key;
            switch (key) {
                case 'ArrowLeft':
                    this._move(true);
                    break;
                case 'ArrowRight':
                    this._move(false);
                    break;
                case 'ArrowUp':
                    this._shoot();
                    break;
                case 'ArrowDown':
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
