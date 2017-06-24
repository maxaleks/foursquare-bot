const BaseController = require('./BaseController');

class RandomInputController extends BaseController {
    handle($) {
        return this.smooch.sendMessage($.appUserId, this.i18n('randomInput'));
    }
}

module.exports = RandomInputController;
