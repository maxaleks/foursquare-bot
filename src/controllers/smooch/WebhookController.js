const BaseController = require('../BaseController');

class WebhookController extends BaseController {
    handle(req, res) {
        this.log({ 'Got update': req.body, }, this.constructor.name);

        return this._bot.handleRawWebhookUpdate(req.body)
        .then(() => {
            return res.sendStatus(200);
        });
    }
}

module.exports = WebhookController;
