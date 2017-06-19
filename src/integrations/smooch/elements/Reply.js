class Reply {
    constructor(text, payload, iconUrl) {
        this._text = text;
        this._iconUrl = iconUrl;
        this._payload = payload;
    }

    static postback(text, payload) {
        return new Reply(
            text,
            payload
        );
    }

    serialize() {
        const obj = {
            type: 'reply',
            text: this._text,
            payload: this._payload,
        };

        if (this._iconUrl) {
            obj.iconUrl = this._iconUrl;
        }

        return obj;
    }
}

module.exports = Reply;
