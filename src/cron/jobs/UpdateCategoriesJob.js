const BaseJob = require('./BaseJob');
const FourSquareApi = require('../../integrations/foursquare');

class UpdateCategoriesJob extends BaseJob {
    constructor(db, smooch, controllers) {
        super(db, smooch, controllers);
        this._task = new this.cronJob({
            cronTime: '00 00 12 * * 0-6',
            onTick: async () => {
                const categories = await FourSquareApi.getCategories();
                this._db.updateCategories(categories);
            },
            start: false,
            timeZone: 'Europe/Minsk',
        });
    }
}

module.exports = UpdateCategoriesJob;
