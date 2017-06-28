const UpdateCategoriesJob = require('./jobs/UpdateCategoriesJob');

class CronJobManager {
    constructor(db, smooch, controllers, foursquare) {
        this._db = db;
        this._smooch = smooch;
        this._controllers = controllers;
        this._foursquare = foursquare;

        this._jobs = [
            new UpdateCategoriesJob(db, smooch, controllers, foursquare),
        ];
    }

    startAllTheJobs() {
        this._jobs.forEach(job => job.start());
    }
}

module.exports = CronJobManager;
