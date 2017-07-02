const BaseController = require('./BaseController');
const PlacesCarousel = require('../helpers/PlacesCarousel');

class SearchController extends BaseController {
    handle($) {
        return this.sendCategories($, this.i18n('search.whatAreYouLooking', [$.sender.username]));
    }

    sendCategories($, text) {
        return this.smooch.sendMessage(
            $.appUserId,
            text,
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
        const category = $.quickReplyPayload.replace('SEARCH_LOOKING_FOR_', '');
        const CATEGORIES = {
            BREAKFAST: 'breakfast',
            DINER: 'diner',
            COFFEE: 'coffee shop',
            FASTFOOD: 'fast food',
            RESTAURANT: 'restaurant',
            BAR: 'bar',
        };
        const categoryId = (await this.db.findCategory(CATEGORIES[category])).externalId;
        const places = await this.foursquare.getNearest($.sender.coordinates, categoryId);

        if (places.length) {
            await this.smooch.sendMessage($.appUserId, this.i18n('search.sweet'));
            await this.smooch.sendCarousel(
                $.appUserId,
                new PlacesCarousel(places, this.i18n)
            );
        } else {
            await this.smooch.sendMessage($.appUserId, this.i18n('search.sorry'));
        }
        return this.sendCategories($, this.i18n('search.somethingElse'));
    }
}

module.exports = SearchController;
