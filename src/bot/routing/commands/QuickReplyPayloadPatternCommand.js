const PostbackCommand = require('./PostbackCommand');

class QuickReplyPayloadPatternCommand extends PostbackCommand {
    test(scope) {
        if (scope.quickReplyPayload) {
            return scope.quickReplyPayload.indexOf(this._payload) === 0;
        }

        return null;
    }
}

module.exports = QuickReplyPayloadPatternCommand;
