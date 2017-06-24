class Message {
    constructor(text, type, role, received, authorId, name, id, source, payload, coordinates) {
        this._text = text;
        this._type = type;
        this._role = role;
        this._received = received;
        this._authorId = authorId;
        this._name = name;
        this._id = id;
        this._source = source;
        this._payload = payload;
        this._coordinates = coordinates;
    }

    get text() {
        return this._text;
    }

    get type() {
        return this._type;
    }

    get role() {
        return this._role;
    }

    get received() {
        return this._received;
    }

    get authorId() {
        return this._authorId;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    get source() {
        return this._source;
    }

    get payload() {
        return this._payload;
    }

    get coordinates() {
        return this._coordinates;
    }

    static deserialize(raw) {
        return new Message(
          raw.text,
          raw.type,
          raw.role,
          raw.received,
          raw.authorId,
          raw.name,
          raw.id,
          raw.source,
          raw.payload,
          raw.coordinates
        );
    }
}

module.exports = Message;
