const BaseController = require('./BaseController');
const FourSquareApi = require('../../integrations/foursquare');
const Carousel = require('../../integrations/smooch/elements/Carousel');
const CarouselElement = require('../../integrations/smooch/elements/CarouselElement');

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

        await this.smooch.sendMessage($.appUserId, this.i18n('search.sweet'));
        const carouselElements = places.map((item, index) => {
            const venue = item.venue;
            const image = venue.featuredPhotos.items[0];
            const imageUrl = `${image.prefix}600x600${image.suffix}`;
            return new CarouselElement(
                `${venue.name} 🏃 ${(venue.location.distance / 1000).toFixed(1)}km`,
                venue.location.address ? `📌 ${venue.location.address}` : '',
                imageUrl,
                [this.base.button.postback(this.i18n('search.moreInfo'), `SEARCH_MORE_INFO_${index}`)]
            );
        });
        await this.smooch.sendCarousel(
            $.appUserId,
            new Carousel(carouselElements)
        );
        return this.sendCategories($, this.i18n('search.somethingElse'));
    }
}

module.exports = SearchController;
