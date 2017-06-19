class MessagePostback {
    constructor(message, action) {
        this._message = message;
        this._action = action;
    }

    get message() {
        return this._message;
    }

    get action() {
        return this._action;
    }

    get payload() {
        return this.action.payload;
    }

    static deserialize(raw) {
        return new MessagePostback(
          raw.message,
          raw.action
        );
    }
}

module.exports = MessagePostback;
