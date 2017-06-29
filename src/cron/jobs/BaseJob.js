const StaticMessageDispatcher = require('../../bot/StaticMessageDispatcher');

class BaseJob {
    constructor(db, smooch, controllers, foursquare) {
        this.cronJob = require('cron').CronJob;

        this._db = db;
        this._smooch = smooch;
        this._controllers = controllers;
        this._foursquare = foursquare;
        this._staticMessageDispatcher = new StaticMessageDispatcher(this._smooch);
        this._task = {};
    }

    start() {
        this._task.start();
    }
}

module.exports = BaseJob;
