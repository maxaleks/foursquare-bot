const BaseController = require('./BaseController');
const PlaceDetails = require('../helpers/PlaceDetails');

class DetailsController extends BaseController {
    handleCall($) {
        const phoneNumber = $.postback.replace('DETAILS_CALL_', '');
        return this.smooch.sendMessage(
            $.appUserId,
            phoneNumber,
            [this.base.reply.postback(this.i18n('details.backToCategories'), 'DETAILS_BACK_TO_CATEGORIES')]
        );
    }

    backToCategories($) {
        return this.controllers.search.handle($);
    }

    async handle($) {
        const placeId = $.postback.replace('DETAILS_MORE_INFO_', '');
        const place = await this.foursquare.getPlace(placeId);

        const { imageUrl, text, buttons } = new PlaceDetails(place, this.i18n, this.base);

        await this.smooch.sendMessage($.appUserId, this.i18n('details.hereIsMoreInfo', [place.name]));
        await this.smooch.sendImageMessage($.appUserId, imageUrl);

        return this.smooch.sendMessage(
            $.appUserId,
            text,
            buttons
        );
    }
}

module.exports = DetailsController;
