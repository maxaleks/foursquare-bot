const BaseController = require('./BaseController');

class RandomInputController extends BaseController {
    handle($) {
        return this.smooch.sendMessage($.appUserId, $.text);
    }
}

module.exports = RandomInputController;
