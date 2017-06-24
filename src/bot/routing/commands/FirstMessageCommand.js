const BaseCommand = require('./BaseCommand');

const CONVERSATION_START = 'conversation:start';

class FirstMessageCommand extends BaseCommand {
    constructor(handler) {
        super();

        this._handler = handler || 'handle';
    }

    test(scope) {
        return scope.trigger === CONVERSATION_START;
    }

    get handlerName() {
        return this._handler;
    }
}

module.exports = FirstMessageCommand;
