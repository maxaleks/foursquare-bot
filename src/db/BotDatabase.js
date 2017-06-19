const SenderContext = require('../bot/SenderContext');

class BotDatabase {
    constructor(connection, models) {
        this._connection = connection;
        this._models = models;
    }

    get connection() {
        return this._connection;
    }

    get models() {
        return this._models;
    }

    registrateSender(user) {
        return this._models.Sender.create({
            externalId: user._id,
        });
    }

    findWebhook() {
        return this._models.Webhook.findOne();
    }

    createWebhook(externalId, target, triggers, secret) {
        return this._models.Webhook.create({
            externalId,
            target,
            triggers,
            secret,
        });
    }

    createAccountStatement(senderId, account, timePeriod, reason, stamp) {
        return this._models.AccountStatement.create({
            senderId,
            account,
            timePeriod,
            reason,
            stamp
        });
    }

    getSenderByExternalId(externalId) {
        return this._models.Sender.findOne({
            where: { externalId, },
        });
    }

    saveSearchParam(senderId, key, value) {
        return this._models.MainSearchParam.findOrCreate(
            {
                where: { senderId, key, },
                defaults: { senderId, key, value: value.toString(), },
            }
        )
        .then((params) => {
            return params[0].update({ key, value: value.toString(), });
        });
    }

    findSearchParam(senderId, key) {
        return this._models.MainSearchParam.findOne({
            where: { senderId, key, },
        });
    }

    clearSearchParam(senderId, key) {
        return this._models.MainSearchParam.destroy({
            where: { senderId, key, },
        });
    }

    clearAllSearchParams(senderId) {
        return this._models.MainSearchParam.destroy({
            where: { senderId, },
        });
    }

    findSearchParamValue(senderId, key) {
        return this.findSearchParam(senderId, key).then((param) => {
            if (param) {
                return param.value;
            } else {
                return null;
            }
        });
    }

    setSenderContext(senderId, context) {
        return this._models.Sender.update(
            {
                chatState: (new SenderContext(context)).serialize(),
            },
            {
                where: { id: senderId, },
            }
        );
    }

    findSenderSearchParams(senderId) {
        return this._models.MainSearchParam.findAll({
            where: { senderId, },
        });
    }

    saveSearchResults(senderId, results) {
        const promises = [];

        results.forEach((item) => {
            return promises.push(this._models.PreloadedSearchResultItem.findOrCreate({
                where: { externalId: item.id, senderId, },
                defaults: { data: item, externalId: item.id, senderId, },
            }));
        });

        return Promise.all(promises);
    }

    changeSenderOnboarding(senderId) {
        return this._models.Sender.update(
            { seenOnboarding: true, },
            { where: { id: senderId, }, }
        );
    }
}

module.exports = BotDatabase;
