const BaseCommand = require('./BaseCommand');

class ContextCommand extends BaseCommand {
    constructor(state, handler) {
        super();

        this._state = state;
        this._handler = handler;
    }

    test(scope) {
        return (scope.context.state === this._state);
    }

    get handlerName() {
        return this._handler;
    }
}

module.exports = ContextCommand;
