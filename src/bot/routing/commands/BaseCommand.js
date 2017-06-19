class BaseCommand {
    test() {
        return true;
    }

    get handlerName() {
        return 'handle';
    }
}

module.exports = BaseCommand;
