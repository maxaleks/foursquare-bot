const BaseCommand = require('./BaseCommand');

class PostbackCommand extends BaseCommand {
    constructor(payload, handler) {
        super();

        handler = handler || 'handle';

        this._payload = payload;
        this._handler = handler;
    }

    test(scope) {
        return scope.update.postbacks && scope.update.postbacks[0] &&
            (scope.update.postbacks[0].payload === this._payload);
    }

    get handlerName() {
        return this._handler;
    }
}

module.exports = PostbackCommand;
