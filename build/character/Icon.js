export default class Icon {
    constructor(_width, _height, imageUrl) {
        this._width = _width;
        this._height = _height;
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
