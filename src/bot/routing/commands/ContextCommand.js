const BaseCommand = require('./BaseCommand');

class ContextCommand extends BaseCommand {
    constructor(state, handler) {
        super();

        this._state = state;
        this._handler = handler;
    }

    test(scope) {
      console.log(scope.context.state);
      console.log(this._state);
        return (scope.context.state === this._state);
    }

    get handlerName() {
        return this._handler;
    }
}

module.exports = ContextCommand;
