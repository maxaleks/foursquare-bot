class Scope {
    constructor(update, sender, context) {
        this._update = update;
        this._sender = sender;
        this._context = context;
    }

    get context() {
        return this._context;
    }

    get contextState() {
        return this.context.state;
    }

    get sender() {
        return this._sender;
    }

    get senderId() {
        return this._sender.id;
    }

    get update() {
        return this._update;
    }

    get text() {
        if (this.update.messages) { return this.update.messages[0].text; }

        return null;
    }

    get postback() {
        if (this._update.postbacks) {
            return this._update.postbacks[0].payload;
        }
        return null;
    }

    get postbackText() {
        if (this._update.postbacks) {
            return this._update.postbacks[0]._action.text;
        }
        return null;
    }

    get quickReplyPayload() {
        if (this.update.messages) {
            return this.update.messages[0].payload;
        }
        return null;
    }

    get appUserId() {
        return this._update.appUser._id;
    }

    get trigger() {
        return this._update.trigger;
    }
}


module.exports = Scope;
