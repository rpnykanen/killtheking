export default class Icon {
    constructor(_height, _width, imageUrl) {
        this._height = _height;
        this._width = _width;
        const img = new Image();
        img.src = imageUrl;
        this._image = img;
    }
    get image() { return this._image; }
    ;
    get width() { return this._width; }
    ;
    get height() { return this._height; }
    ;
}
