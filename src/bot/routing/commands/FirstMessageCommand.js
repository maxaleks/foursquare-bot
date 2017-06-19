const BaseCommand = require('./BaseCommand');

class TextCommand extends BaseCommand {
    constructor(handler) {
        super();

        this._handler = handler;
    }

    test(scope) {
        return !scope.sender.seenOnboarding;
    }

    get handlerName() {
        return this._handler;
    }
}

module.exports = TextCommand;
