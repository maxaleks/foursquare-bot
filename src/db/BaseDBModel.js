class BaseDBModel {
    constructor(rawModel) {
        this._rawModel = rawModel || null;
        this._name = this.constructor.name;
    }

    get name() {
        return this._name;
    }

    get sequelizeModel() {
        return [
            this.fields,
            Object.assign(this.config, {
                instanceMethods: this.instanceMethods || {},
            }),
        ];
    }

    get fields() {
        return {};
    }

    get instanceMethods() {
        return {};
    }

    get config() {
        return {};
    }
}

module.exports = BaseDBModel;
