const BaseController = require('./BaseController');

class DetailsController extends BaseController {
    detailsImage(venue) {
        let imageUrl = null;
        let image = null;
        if (venue.bestPhoto) {
            image = venue.bestPhoto;
            imageUrl = `${image.prefix}600x600${image.suffix}`;
        } else {
            image = venue.categories[0].icon;
            imageUrl = `${image.prefix}bg_120${image.suffix}`;
        }
        return imageUrl;
    }

    detailsText(place) {
        let details = `${place.name}\n\n`;
        if (place.hours) {
            details += place.hours.isOpen
                       ? this.i18n('details.open')
                       : this.i18n('details.closed');
        }
        details += place.location.address ? `📌 ${place.location.address}\n` : '';
        details += place.rating ? this.i18n('details.rating', [place.rating]) : '';
        details += place.price ? `💵 ${place.price.message} (${place.price.currency})` : '';
        return details;
    }

    async handle($) {
        const placeId = $.postback.replace('DETAILS_MORE_INFO_', '');
        const place = await this.foursquare.getPlace(placeId);

        const imageUrl = this.detailsImage(place);
        const detailsText = this.detailsText(place);

        await this.smooch.sendMessage($.appUserId, this.i18n('details.hereIsMoreInfo', [place.name]));
        await this.smooch.sendImageMessage($.appUserId, imageUrl);
        return this.smooch.sendMessage(
            $.appUserId,
            detailsText,
            [
                this.base.reply.postback(this.i18n('details.backToResults'), 'DETAILS_BACK_TO_RESULTS'),
                this.base.reply.postback(this.i18n('details.website'), 'DETAILS_WEBSITE'),
                this.base.reply.postback(this.i18n('details.call'), 'DETAILS_CALL'),
                this.base.reply.postback(this.i18n('details.facebookPage'), 'DETAILS_FACEBOOK'),
            ]
        );
    }
}

module.exports = DetailsController;
