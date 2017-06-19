const BaseCommand = require('./BaseCommand');

class AnyCommand extends BaseCommand {
    test() {
        return true;
    }

    get handlerName() {
        return 'handle';
    }
}

module.exports = AnyCommand;
