const UpdateCategoriesJob = require('./jobs/UpdateCategoriesJob');

class CronJobManager {
    constructor(db, smooch, controllers) {
        this._db = db;
        this._smooch = smooch;
        this._controllers = controllers;

        this._jobs = [
            new UpdateCategoriesJob(db, smooch, controllers),
        ];
    }

    startAllTheJobs() {
        this._jobs.forEach(job => job.start());
    }
}

module.exports = CronJobManager;
