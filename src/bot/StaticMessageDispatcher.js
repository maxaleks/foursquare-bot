class StaticMessageDispatcher {
    constructor(smooch) {
        this._smooch = smooch;
    }

    sendMessages(messages, senderId) {
        if (messages.length > 0) {
            const promObjs = messages.map(message => () => this._sendMessage(message, senderId));

            return promObjs.reduce((prev, curr) => {
                return prev.then(curr);
            }, Promise.resolve(1));
        } else {
            return Promise.resolve(1);
        }
    }

    _sendMessage(message, senderId) {
        return this._smooch.sendMessage(senderId, message);
    }
}

module.exports = StaticMessageDispatcher;
