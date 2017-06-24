const BaseController = require('./BaseController');

class SearchController extends BaseController {
    async handle($) {
        await this.smooch.sendMessage(
            $.appUserId,
            this.i18n('search.whatAreYouLooking', [$.sender.username]),
            [
              this.base.reply.postback('Breakfast 🍳', 'SEARCH_LOOKING_FOR_BREAKFAST'),
              this.base.reply.postback('Lunch 🌭', 'SEARCH_LOOKING_FOR_LUNCH'),
              this.base.reply.postback('Dinner 🍽', 'SEARCH_LOOKING_FOR_DINNER'),
              this.base.reply.postback('Coffee & Tea ☕️', 'SEARCH_LOOKING_FOR_COFFE_AND_TEA'),
              this.base.reply.postback('Nightlife 🍹', 'SEARCH_LOOKING_FOR_NIGHTLIFE'),
              this.base.reply.postback('Things to do 🍿', 'SEARCH_LOOKING_FOR_THINGS_TO_DO'),
            ]
        );
    }
}

module.exports = SearchController;
