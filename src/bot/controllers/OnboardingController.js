const BaseController = require('./BaseController');

class OnboardingController extends BaseController {
    async handle($) {
        await this.smooch.sendMessage($.appUserId, this.i18n('onboarding.hey'));
        await this.smooch.sendMessage($.appUserId, this.i18n('onboarding.myNameIsFoxy'));
        await this.smooch.sendMessage($.appUserId, this.i18n('onboarding.howCanICallYou'));
        return this._db.setSenderContext($.senderId, 'ONBOARDING_WAIT_FOR_USERNAME');
    }

    async saveUsername($) {
        await this._db.setSenderContext($.senderId, null);
        await this._db.saveUsername($.senderId, $.text);
        await this.smooch.sendLocationRequest(
          $.appUserId,
          this.i18n('onboarding.sendMeYourLocation', [$.text]),
          this.i18n('sendLocation')
        );
        return this._db.setSenderContext($.senderId, 'ONBOARDING_WAIT_FOR_LOCATION');
    }

    async saveLocation($) {
        await this._db.setSenderContext($.senderId, null);
        await this._db.saveLocation($.senderId, $.coordinates);
        return this.controllers.search.handle($);
    }
}

module.exports = OnboardingController;
