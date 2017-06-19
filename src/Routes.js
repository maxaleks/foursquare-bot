const path = require('path');
const WebhookController = require('./controllers/smooch/WebhookController');
const Bot = require('./bot/Bot');
const Config = require('./config');

const inject = controller => (req, res, next) => controller.handle(req, res, next);

module.exports = (app, logger, db, smooch) => {
    const bot = new Bot(logger, db, smooch);
    app.head('/', (req, res) => res.end());
    app.get('/config', (req, res) => res.sendFile(path.join(__dirname, 'config.json')));
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, './index.html')));
    app.post(Config.Server.SmoochWebhook.path, inject(new WebhookController(bot, logger, db)));
};
