const BaseCommand = require('./BaseCommand');

class TextCommand extends BaseCommand {

    constructor(textPattern, handler) {
        super();

        this._textPattern = textPattern.toLowerCase();
        this._handler = handler;
    }

    test(scope) {
        return scope.text && scope.text.toLowerCase().indexOf(this._textPattern) === 0;
    }

    get handlerName() {
        return this._handler;
    }
}

module.exports = TextCommand;
