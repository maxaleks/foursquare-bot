class Carousel {
    constructor(elements) {
        this._elements = elements;
    }

    serialize() {
        return {
            role: 'appMaker',
            type: 'carousel',
            items: this._elements.map(element => element.serialize()),
        };
    }
}

module.exports = Carousel;
