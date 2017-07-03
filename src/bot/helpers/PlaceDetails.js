class PlaceDetails {
    constructor(place, i18n, base) {
        this._place = place;
        this._i18n = i18n;
        this._base = base;
        this._text = this.generateText();
        this._imageUrl = this.generateImageUrl();
        this._buttons = this.generateButtons();
    }

    generateText() {
        const place = this._place;
        let details = `${place.name}\n\n`;
        if (place.hours) {
            details += place.hours.isOpen
                       ? this._i18n('details.open')
                       : this._i18n('details.closed');
        }
        details += place.location.address ? `📌 ${place.location.address}\n` : '';
        details += place.rating ? this._i18n('details.rating', [place.rating]) : '';
        details += place.price ? `💵 ${place.price.message} (${place.price.currency})` : '';
        return details;
    }

    generateImageUrl() {
        const place = this._place;
        let imageUrl = null;
        let image = null;
        if (place.bestPhoto) {
            image = place.bestPhoto;
            imageUrl = `${image.prefix}600x600${image.suffix}`;
        } else {
            image = place.categories[0].icon;
            imageUrl = `${image.prefix}bg_120${image.suffix}`;
        }
        return imageUrl;
    }

    generateButtons() {
        const place = this._place;
        const buttons = [this._base.button.postback(this._i18n('details.backToCategories'), 'DETAILS_BACK_TO_CATEGORIES')];
        if (place.url) {
            buttons.push(this._base.button.link(this._i18n('details.website'), place.url));
        }
        if (place.contact.phone) {
            buttons.push(this._base.button.postback(this._i18n('details.call'), `DETAILS_CALL_${place.contact.phone}`));
        }
        if (place.contact.facebook) {
            buttons.push(this._base.button.link(this._i18n('details.facebookPage'), `https://facebook.com/${place.contact.facebook}`));
        }
        return buttons;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    get text() {
        return this._text;
    }

    get buttons() {
        return this._buttons;
    }
}

module.exports = PlaceDetails;
