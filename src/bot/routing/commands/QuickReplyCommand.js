const BaseCommand = require('./BaseCommand');

class QuickReplyCommand extends BaseCommand {
    constructor(payload, handler) {
        super();

        handler = handler || 'handle';

        this._payload = payload;
        this._handler = handler;
    }

    test(scope) {
        if (scope.quickReplyPayload) {
            return scope.quickReplyPayload === this._payload;
        }
        return null;
    }

    get handlerName() {
        return this._handler;
    }
}

module.exports = QuickReplyCommand;
