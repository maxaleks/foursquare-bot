const BaseController = require('./BaseController');

class SearchController extends BaseController {
    handle($) {
        return this.smooch.sendMessage(
            $.appUserId,
            this.i18n('search.whatAreYouLooking', [$.sender.username]),
            [
                this.base.reply.postback(this.i18n('search.categories.breakfast'), 'SEARCH_LOOKING_FOR_BREAKFAST'),
                this.base.reply.postback(this.i18n('search.categories.lunch'), 'SEARCH_LOOKING_FOR_LUNCH'),
                this.base.reply.postback(this.i18n('search.categories.dinner'), 'SEARCH_LOOKING_FOR_DINNER'),
                this.base.reply.postback(this.i18n('search.categories.coffeeAndTee'), 'SEARCH_LOOKING_FOR_COFFEE_AND_TEA'),
                this.base.reply.postback(this.i18n('search.categories.nightlife'), 'SEARCH_LOOKING_FOR_NIGHTLIFE'),
                this.base.reply.postback(this.i18n('search.categories.thingsToDo'), 'SEARCH_LOOKING_FOR_THINGS_TO_DO'),
            ]
        );
    }

    renderPlaces($) {
        const category = $.quickReplyPayload.replace('SEARCH_LOOKING_FOR_', '');
    }
}

module.exports = SearchController;
