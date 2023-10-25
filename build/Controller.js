export default class Controller {
    constructor() {
        this.handleAction = (keyUp) => {
            const key = keyUp.key;
            console;
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
        this.setMove = (move) => {
            this._move = move;
        };
        this.setShoot = (shoot) => {
            this._shoot = shoot;
        };
        this.setSkip = (skip) => {
            this._skip = skip;
        };
        document.addEventListener('keyup', this.handleAction);
    }
}
