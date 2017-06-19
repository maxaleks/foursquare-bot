const Sequelize = require('sequelize');
const BaseDBModel = require('../BaseDBModel');

class Webhook extends BaseDBModel {
    get fields() {
        return {
            externalId: Sequelize.TEXT,
            target: Sequelize.TEXT,
            secret: Sequelize.TEXT,
            triggers: Sequelize.ARRAY(Sequelize.TEXT),
        };
    }

    get externalId() {
        return this._rawModel.get('externalId');
    }

    get target() {
        return this._rawModel.get('target');
    }

    get secret() {
        return this._rawModel.get('secret');
    }

    get triggers() {
        return this._rawModel.get('triggers');
    }

    get instanceMethods() {
        return {};
    }
}

module.exports = Webhook;
