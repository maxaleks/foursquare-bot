const Sequelize = require('sequelize');
const BaseDBModel = require('../BaseDBModel');

class Sender extends BaseDBModel {
    get fields() {
        return {
            externalId: Sequelize.TEXT,
            chatState: {
                type: Sequelize.JSON,
                defaultValue: {},
            },
            username: Sequelize.TEXT,
        };
    }

    get externalId() {
        return this._rawModel.get('externalId');
    }

    get chatState() {
        return this._rawModel.get('chatState');
    }

    get instanceMethods() {
        return {};
    }

    get username() {
        return this._rawModel.get('username');
    }
}

module.exports = Sender;
