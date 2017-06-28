const Sequelize = require('sequelize');
const BaseDBModel = require('../BaseDBModel');

class Category extends BaseDBModel {
    get fields() {
        return {
            externalId: Sequelize.TEXT,
            name: Sequelize.TEXT,
        };
    }

    get externalId() {
        return this._rawModel.get('externalId');
    }

    get name() {
        return this._rawModel.get('name');
    }
}

module.exports = Category;
