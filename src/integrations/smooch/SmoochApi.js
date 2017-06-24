const smoochCore = require('smooch-core');

const config = require('../../config');

const keyId = config.Smooch.keyId;
const secret = config.Smooch.secret;

class SmoochApi {
    constructor() {
        this._client = this._initializeClient();
    }

    sendMessage(userId, text, buttons) {
        return this.showTypingIndicator(userId)
            .then(() => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const params = {
                            text,
                            role: 'appMaker',
                            type: 'text',
                        };

                        if (buttons) { params.actions = buttons.map(button => button.serialize()); }

                        resolve(this._client.appUsers.sendMessage(userId, params));
                    }, 0);
                });
            });
    }

    sendLocationRequest(userId, coordinates) {
        return this._client.appUsers.sendMessage(userId, {
            role: 'appUser',
            type: 'location',
            coordinates,
        });
    }

    getAppUser(userId) {
        return this._client.appUser.get(userId);
    }

    showTypingIndicator(userId) {
        return this._client.appUsers.typingActivity(userId, {
            role: 'appMaker',
            type: 'typing:start',
        });
    }

    hideTypingIndicator(userId) {
        return this._client.appUsers.typingActivity(userId, {
            role: 'appMaker',
            type: 'typing:stop',
        });
    }

    sendImageMessage(userId, mediaUrl, text, buttons) {
        const params = {
            role: 'appMaker',
            type: 'image',
            text,
            mediaUrl,
        };

        if (buttons) { params.actions = buttons.map(b => b.serialize()); }

        return this._client.appUsers.sendMessage(userId, params);
    }

    sendCarousel(userId, carousel) {
        return this._client.appUsers.sendMessage(userId, carousel.serialize());
    }

    updateWebhook(webhookId, target, triggers) {
        return this._client.webhooks.update(webhookId, {
            target,
            triggers: triggers || ['*'],
        });
    }

    createWebhook(target, triggers) {
        return this._client.webhooks.create({
            target,
            triggers: triggers || ['*'],
        });
    }

    _initializeClient() {
        return new smoochCore({ keyId, secret, scope: 'app', });
    }
}

module.exports = SmoochApi;
