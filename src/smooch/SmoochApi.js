const smoochCore = require('smooch-core');

const config = require('../config');

const keyId = config.Smooch.keyId;
const secret = config.Smooch.secret;

class SmoochApi {
    constructor() {
        this.client = this._initializeClient();
    }

    _initializeClient() {
        return new smoochCore({ keyId, secret, scope: 'app', });
    }
}

module.exports = SmoochApi;
