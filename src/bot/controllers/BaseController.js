const StaticMessageDispatcher = require('../StaticMessageDispatcher');
const Button = require('../../integrations/smooch/elements/Button');
const Reply = require('../../integrations/smooch/elements/Reply');

class BaseController {
    constructor(logger, smooch, db, i18n, foursquare) {
        this._logger = logger;
        this._smooch = smooch;
        this._db = db;
        this._i18n = i18n;
        this._foursquare = foursquare;

        this._staticMessageDispatcher = new StaticMessageDispatcher(smooch);
    }

    get smooch() {
        return this._smooch;
    }

    get logger() {
        return this._logger;
    }

    set i18n(func) {
        return this._i18n = func;
    }

    get i18n() {
        return this._i18n;
    }

    get foursquare() {
        return this._foursquare;
    }

    _randomi18n(string, param) {
        if (param) {
            return lodash.sample(this._i18n.__(string)).replace('%s', param);
        } else {
            return lodash.sample(this._i18n.__(string));
        }
    }

    get db() {
        return this._db;
    }

    log(data, name) {
        this._logger.log(data, name || this.constructor.name);
    }

    get base() {
        return {
            apiAi: this._apiAi,
            smooch: this._smooch,
            button: Button,
            reply: Reply,
        };
    }
}

module.exports = BaseController;
