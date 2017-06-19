class BaseController {
    constructor(bot, logger, db) {
        this._logger = logger;
        this._db = db;
        this._bot = bot;
    }

    log(data, name) {
        this._logger.log('info', data, name);
    }

    handle() { throw 'Not implemented'; }
}

module.exports = BaseController;
