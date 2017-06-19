class Route {
    constructor(commands, controller) {
        this._commands = Array.isArray(commands) ? commands : [commands];
        this._controller = controller;
    }

    get commands() {
        return this._commands;
    }

    get controller() {
        return this._controller;
    }

    test(scope) {
        for (const command of this._commands) {
            if (command.test(scope) === true) {
                return command;
            }
        }

        return false;
    }
}

module.exports = Route;
