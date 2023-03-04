export default class Icon {

    private _image: HTMLImageElement;

    constructor(private _width: number, private _height: number, imageUrl: string) {
        const img = new Image();
        img.src = imageUrl;
        this._image = img;
    }

    get image() {return this._image};

    get width() {return this._width};

    get height() {return this._height};
    

}