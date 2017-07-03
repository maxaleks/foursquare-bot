if (process.argv[2] === 'production') {
    require('newrelic');
}
const DBModels = require('./db/DBModels');
const BotDatabase = require('./db/BotDatabase');
const DBConfig = require('../config/config');
const Sequelize = require('sequelize');

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const Config = require('./config');
const morgan = require('morgan');
const logger = require('./utils/logger');
const cors = require('cors');
const Routes = require('./Routes');
const rollbar = require('rollbar');

const SmoochApi = require('./integrations/smooch/SmoochApi');

const environment = process.argv[2] || 'development';

class App {
    constructor() {
        this._logger = logger;

        this._dbConnection = new Sequelize(
            DBConfig[environment].database,
            DBConfig[environment].username,
            DBConfig[environment].password,
            DBConfig[environment]
        );

        const models = new DBModels(this._dbConnection);

        this._db = new BotDatabase(this._dbConnection, models);
        this._smooch = new SmoochApi(this._logger);

        this._setup();
    }

    _setup() {
        this._app = express();

        this._app.use(bodyParser.json());
        this._app.use(morgan('combined', { stream: logger.stream }));
        this._app.use(cors());

        this._app.use('/js', express.static(path.join(__dirname, '../client')));

        this._app.listen(Config.Server.Port);

        if (environment === 'production') {
            this._app.use(rollbar.errorHandler(Config.rollbar.token, { environment }));

            rollbar.handleUncaughtExceptionsAndRejections(Config.rollbar.token, { environment });
        }

        this._app.smooch = this._smooch;
        this._app.dbConnection = this._dbConnection;

        this._setupRoutes();
    }

    _setupRoutes() {
        Routes(
            this._app,
            this._logger,
            this._db,
            this._smooch
        );
    }
}

const server = new App()._app;

module.exports = server;
