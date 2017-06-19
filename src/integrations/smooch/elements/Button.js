class Button {
    constructor(type, text, param) {
        this._type = type;
        this._text = text;
        this._param = param;
    }

    static link(text, link) {
        return new Button(
            'link',
            text,
            link
        );
    }

    static postback(text, postback) {
        return new Button(
            'postback',
            text,
            postback
        );
    }

    serialize() {
        const obj = {
            type: this._type,
            text: this._text,
        };

        obj[this._type === 'link' ? 'uri' : 'payload'] = this._param;

        return obj;
    }

}

module.exports = Button;
