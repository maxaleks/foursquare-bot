const Button = require('../../integrations/smooch/elements/Button');
const Carousel = require('../../integrations/smooch/elements/Carousel');
const CarouselElement = require('../../integrations/smooch/elements/CarouselElement');

class PlacesCarousel {
    constructor(places, i18n) {
        this._places = places;
        this._i18n = i18n;
    }
    serialize() {
        const carouselElements = this._places.map((item) => {
            const venue = item.venue;
            let imageUrl = null;
            let image = null;
            if (venue.featuredPhotos) {
                image = venue.featuredPhotos.items[0];
                imageUrl = `${image.prefix}600x600${image.suffix}`;
            } else {
                image = venue.categories[0].icon;
                imageUrl = `${image.prefix}bg_120${image.suffix}`;
            }
            return new CarouselElement(
                `${venue.name} 🏃 ${(venue.location.distance / 1000).toFixed(1)}km`,
                venue.location.address ? `📌 ${venue.location.address}` : '',
                imageUrl,
                [Button.postback(this._i18n('search.moreInfo'), `DETAILS_MORE_INFO_${venue.id}`)]
            );
        });

        return new Carousel(carouselElements).serialize();
    }
}

module.exports = PlacesCarousel;
