const Route = require('./Route');

class Router {
    constructor() {
        this._routes = [];
        this._otherwiseController = null;
    }

    when(commands, controller) {
        this._routes.push(new Route(commands, controller));

        return this;
    }

    otherwise(controller) {
        this._otherwiseController = controller;

        return this;
    }

    get otherwiseController() {
        return this._otherwiseController;
    }

    controllersForScope(scope) {
        const controllers = [];

        this._routes.forEach((route) => {
            const command = route.test(scope);

            if (command !== false) {
                const controllerHandler = command.handlerName || 'handle';

                controllers.push({
                    controller: route.controller,
                    handler: controllerHandler,
                });
            }
        });

        if (controllers.length === 0 && this._otherwiseController !== null) {
            controllers.push({ controller: this._otherwiseController, handler: 'handle', });
        }

        return controllers;
    }
}

module.exports = Router;
