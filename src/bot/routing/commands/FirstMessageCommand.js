const BaseCommand = require('./BaseCommand');

const convStart = 'conversation:start';

class FirstMessageCommand extends BaseCommand {
    constructor(handler) {
        super();

        this._handler = handler || 'handle';
    }

    test(scope) {
        return scope.trigger === convStart;
    }

    get handlerName() {
        return this._handler;
    }
}

module.exports = FirstMessageCommand;
