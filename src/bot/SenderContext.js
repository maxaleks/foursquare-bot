class SenderContext {
    constructor(state) {
        this._state = state;
    }

    get state() {
        return this._state;
    }

    static deserialize(rawContext) {
        return new SenderContext(
            rawContext.STATE || null
        );
    }

    serialize() {
        return {
            STATE: this._state || undefined,
        };
    }
}

module.exports = SenderContext;
