const Message = require('./Message');
const MessagePostback = require('./MessagePostback');

class WebhookUpdate {
    constructor(trigger, app, messages, appUser, postbacks) {
        this._trigger = trigger;
        this._app = app;
        this._messages = messages;
        this._appUser = appUser;
        this._postbacks = postbacks;
    }

    get trigger() {
        return this._trigger;
    }

    get app() {
        return this._app;
    }

    get messages() {
        return this._messages;
    }

    get appUser() {
        return this._appUser;
    }

    get postbacks() {
        return this._postbacks;
    }

    static deserialize(raw) {
        return new WebhookUpdate(
            raw.trigger,
            raw.app,
            raw.messages ? raw.messages.map(m => Message.deserialize(m)) : null,
            raw.appUser,
            raw.postbacks ? raw.postbacks.map(p => MessagePostback.deserialize(p)) : null
        );
    }
}

module.exports = WebhookUpdate;
