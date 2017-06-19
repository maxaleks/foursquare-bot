const PostbackCommand = require('./PostbackCommand');

class PostbackPatternCommand extends PostbackCommand {
    constructor(payload, handler) {
        super();

        handler = handler || 'handle';

        this._payload = payload;
        this._handler = handler;
    }

    test(scope) {
        return scope.update.postbacks && scope.update.postbacks[0] &&
            (scope.update.postbacks[0].payload.indexOf(this._payload) === 0);
    }

    get handlerName() {
        return this._handler;
    }
}

module.exports = PostbackPatternCommand;
