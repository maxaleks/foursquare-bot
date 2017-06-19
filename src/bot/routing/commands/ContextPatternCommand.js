const ContextCommand = require('./ContextCommand');

class ContextPatternCommand extends ContextCommand {
    test(scope) {
        return scope.context && scope.context.state && (scope.context.state.indexOf(this._state) > -1);
    }
}

module.exports = ContextPatternCommand;
