const BaseController = require('./BaseController');
const FourSquareApi = require('../../integrations/foursquare');

class SearchController extends BaseController {
    handle($) {
        return this.smooch.sendMessage(
            $.appUserId,
            this.i18n('search.whatAreYouLooking', [$.sender.username]),
            [
                this.base.reply.postback(this.i18n('search.categories.breakfast'), 'SEARCH_LOOKING_FOR_BREAKFAST'),
                this.base.reply.postback(this.i18n('search.categories.diner'), 'SEARCH_LOOKING_FOR_DINER'),
                this.base.reply.postback(this.i18n('search.categories.coffee'), 'SEARCH_LOOKING_FOR_COFFEE'),
                this.base.reply.postback(this.i18n('search.categories.fastfood'), 'SEARCH_LOOKING_FOR_FASTFOOD'),
                this.base.reply.postback(this.i18n('search.categories.restaurant'), 'SEARCH_LOOKING_FOR_RESTAURANT'),
                this.base.reply.postback(this.i18n('search.categories.bar'), 'SEARCH_LOOKING_FOR_BAR'),
            ]
        );
    }

    async renderPlaces($) {
        let category = $.quickReplyPayload.replace('SEARCH_LOOKING_FOR_', '');
        switch (category) {
          case 'BREAKFAST':
            category = 'breakfast';
            break;
          case 'DINER':
            category = 'diner';
            break;
          case 'COFFEE':
            category = 'coffee shop';
            break;
          case 'FASTFOOD':
            category = 'fast food';
            break;
          case 'RESTAURANT':
            category = 'restaurant';
            break;
          case 'BAR':
            category = 'bar';
            break;
          default:
            category = 'breakfast';
        }
        const categories = await this.db.getCategories();
        const categoryId = categories.find(item => item.name === category).externalId;
        const places = await FourSquareApi.getNearest($.sender.coordinates, categoryId);
    }
}

module.exports = SearchController;
