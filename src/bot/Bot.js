const i18n = require('i18n');
const path = require('path');
const lodash = require('lodash');
const Config = require('../config');

const Router = require('./routing/Router');
const CronJobManager = require('../cron/CronJobManager');

const TextCommand = require('./routing/commands/TextCommand');
const PostbackCommand = require('./routing/commands/PostbackCommand');
const PostbackPatternCommand = require('./routing/commands/PostbackPatternCommand');
const ContextPatternCommand = require('./routing/commands/ContextPatternCommand');
const QuickReplyPayloadPatternCommand = require('./routing/commands/QuickReplyPayloadPatternCommand');
const ContextCommand = require('./routing/commands/ContextCommand');
const FirstMessageCommand = require('./routing/commands/FirstMessageCommand');

const RandomInputController = require('./controllers/RandomInputController');
const OnboardingController = require('./controllers/OnboardingController');
const SearchController = require('./controllers/SearchController');

const WebhookUpdate = require('../smooch/WebhookUpdate');
const WebhookUpdateProcessor = require('./webhooks/WebhookUpdateProcessor');

const smoochWebhookConfig = Config.Server.SmoochWebhook;

class Bot {
    constructor(logger, db, smooch, initCronJobs = true) {
        this._logger = logger;
        this._db = db;
        this._smooch = smooch;
        this._router = new Router();

        this._setupi18n();

        if (process.env.NODE_ENV !== 'test') {
            this._setupWebhooks();
        }

        this._controllers = {
            randomInput: this._injectController(RandomInputController),
            onboarding: this._injectController(OnboardingController),
            search: this._injectController(SearchController),
        };

        Object.keys(this._controllers).forEach((k) => {
            this._controllers[k].controllers = this._controllers;
        });

        this._setupRoutes();

        if (initCronJobs) {
            this._initCronJobs();
        }

        this._webhookUpdateProcessor = new WebhookUpdateProcessor(
            this._db,
            this._router,
            this._smooch,
            this._i18n
        );
    }

    handleRawWebhookUpdate(rawUpdate) {
        return this._webhookUpdateProcessor.handle(WebhookUpdate.deserialize(rawUpdate));
    }

    _setupWebhooks() {
        const webhookUrl = `${smoochWebhookConfig.baseUri}${smoochWebhookConfig.path}`;
        const webhookTriggers = smoochWebhookConfig.triggers;

        this._db.findWebhook()
        .then((webhook) => {
            if (webhook) {
                const targetMatches = (webhook.target === webhookUrl);
                const triggersMatch = (webhook.triggers.sort().toString() === webhookTriggers.sort().toString());

                if (!targetMatches || !triggersMatch) {
                    this._smooch.updateWebhook(webhook.externalId, webhookUrl, webhookTriggers)
                    .then((result) => {
                        const updatedWebhook = result.webhook;

                        webhook.update({
                            target: updatedWebhook.target,
                            triggers: updatedWebhook.triggers,
                            secret: updatedWebhook.secret,
                        });
                    })
                    .catch((error) => {
                        this._logger.warn(`Error updating webhook: ${error}`, this.constructor.name);
                    });
                }
            } else {
                this._smooch.createWebhook(webhookUrl, webhookTriggers)
                .then((result) => {
                    const createdWebhook = result.webhook;

                    this._db.createWebhook(
                        createdWebhook._id,
                        createdWebhook.target,
                        createdWebhook.triggers,
                        createdWebhook.secret
                    );
                })
                .catch((error) => {
                    this._logger.warn(`Error creating webhook: ${error}`, this.constructor.name);
                });
            }
        });
    }

    _initCronJobs() {
        new CronJobManager(
            this._db,
            this._smooch,
            this._controllers
        ).startAllTheJobs();
    }

    _setupRoutes() {
        this._router
        .when(
          [
            new FirstMessageCommand(),
            new TextCommand('bla'),
            new ContextCommand('ONBOARDING_WAIT_FOR_USERNAME', 'saveUsername'),
            new ContextCommand('ONBOARDING_WAIT_FOR_LOCATION', 'saveLocation'),
          ],
          this._controllers.onboarding
        )
        .otherwise(this._controllers.randomInput);
    }

    _injectController(controller) {
        const controllerObject = new controller(
            this._logger,
            this._smooch,
            this._db,
            this._i18n
        );

        return controllerObject;
    }

    _setupi18n() {
        i18n.configure({
            locales: ['en'],
            directory: path.join(__dirname, '../locales'),
            updateFiles: false,
            objectNotation: true,
        });

        i18n.setLocale('en');
    }

    _i18n(string, params) {
        let value = i18n.__(string);

        if (Array.isArray(value)) {
            return lodash.sample(value).replace('%s', params);
        } else {
            if (params) {
                value = i18n.__(string, ...params);
            } else {
                value = i18n.__(string);
            }
            return value;
        }
    }
}

module.exports = Bot;
