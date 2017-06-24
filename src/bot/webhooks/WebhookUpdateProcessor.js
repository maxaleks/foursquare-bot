const Scope = require('./Scope');
const SenderContext = require('../SenderContext');

const VALID_TRIGGERS = ['message:appUser', 'postback', 'conversation:start'];

class WebhookUpdateProcessor {
    constructor(db, router, smooch, i18n) {
        this._db = db;
        this._router = router;
        this._smooch = smooch;
        this._i18n = i18n;
    }

    handle(update) {
        if (this._isValidTrigger(update.trigger)) {
            return this._validateSender(update)
            .then((sender) => {
                const scope = new Scope(update, sender, SenderContext.deserialize(sender.chatState));
                const item = this._router.controllersForScope(scope)[0];

                const controller = item.controller;
                const handler = item.handler;
                return controller[handler](scope);
            });
        }
        return Promise.resolve();
    }

    _validateSender(update) {
        return this._db.getSenderByExternalId(update.appUser._id)
        .then((sender) => {
            if (!sender) {
                return this._db.registrateSender(update.appUser);
            }

            return sender;
        });
    }

    _isValidTrigger(trigger) {
        return VALID_TRIGGERS.includes(trigger);
    }

    get i18n() {
        return this._i18n;
    }
}

module.exports = WebhookUpdateProcessor;
