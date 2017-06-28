const Sender = require('./models/Sender');
const Webhook = require('./models/Webhook');
const Category = require('./models/Category');

class DBModels {
    constructor(sequelize) {
        const models = [
            new Sender(),
            new Webhook(),
            new Category(),
        ];

        this._models = {};

        models.forEach((model) => {
            this._models[model._name] = sequelize.define(model._name, ...model.sequelizeModel);
        });
    }

    get models() {
        return this._models;
    }

    get User() {
        return this._models.User;
    }

    get Sender() {
        return this._models.Sender;
    }

    get AccountStatement() {
        return this._models.AccountStatement;
    }

    get MainSearchParam() {
        return this._models.MainSearchParam;
    }

    get Webhook() {
        return this._models.Webhook;
    }

    get Category() {
        return this._models.Category;
    }
}

module.exports = DBModels;
