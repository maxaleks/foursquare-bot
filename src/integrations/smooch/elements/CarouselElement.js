class CarouselElement {
    constructor(title, text, imageUrl, actions) {
        this._title = title;
        this._text = text;
        this._imageUrl = imageUrl;
        this._actions = actions;
    }

    serialize() {
        return {
            title: this._title,
            description: this._text,
            mediaUrl: this._imageUrl,
            actions: this._actions.map(action => action.serialize()),
        };
    }
}

module.exports = CarouselElement;
