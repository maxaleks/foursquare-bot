const Sequelize = require('sequelize');
const DBModels = require('./DBModels');
const BotDatabase = require('./BotDatabase');

const MODE = process.argv[2] || 'development';

const DBConfig = require('../../config/config');

const dbConnection = new Sequelize(
    DBConfig[MODE].database,
    DBConfig[MODE].username,
    DBConfig[MODE].password,
    DBConfig[MODE]
);

const models = new DBModels(dbConnection);

const db = new BotDatabase(dbConnection, models);

module.exports = db;
