const BaseJob = require('./BaseJob');

class UpdateCategoriesJob extends BaseJob {
    constructor(db, smooch, controllers, foursquare) {
        super(db, smooch, controllers, foursquare);
        this._task = new this.cronJob({
            cronTime: '00 00 12 * * 0-6',
            onTick: async () => {
                const categories = await this._foursquare.getCategories();
                this._db.updateCategories(categories);
            },
            start: false,
            timeZone: 'Europe/Minsk',
        });
    }
}

module.exports = UpdateCategoriesJob;
