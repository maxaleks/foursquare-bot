const axios = require('axios');

const config = require('../../config');

const { clientId, clientSecret, apiUrl } = config.FourSquare;

class FourSquareApi {
    request(url, data, method, parameters = {}) {
        const params = Object.assign({}, parameters, {
            client_id: clientId,
            client_secret: clientSecret,
            v: '20170626', // version as a date
        });
        return axios({
            method,
            url: apiUrl + url,
            params,
            data,
            headers: {
                'Accept-Language': 'EN',
                'Content-Type': 'application/json',
            },
        });
    }

    get(url, params) {
        return this.request(url, null, 'GET', params);
    }

    async getNearest(coords, categoryId) {
        const { lat, long } = coords;
        const ll = [lat, long].join(',');
        const response = await this.get('/venues/explore', { ll, categoryId, limit: 6, radius: 1000, venuePhotos: 1 });
        return response.data.response.groups[0].items;
    }

    filterCategories(tree) {
        const desired = ['breakfast', 'diner', 'coffee shop', 'fast food', 'restaurant', 'bar'];
        let founded = [];
        tree.forEach((item) => {
            if (item.categories) {
                founded = [...founded, ...this.filterCategories(item.categories)];
            }
            if (desired.includes(item.shortName.toLowerCase())) {
                founded.push(item);
            }
        });
        return founded;
    }

    async getCategories() {
        const categories = (await this.get('/venues/categories')).data.response.categories;
        return this.filterCategories(categories).map(item => ({ externalId: item.id, name: item.shortName.toLowerCase() }));
    }
}

module.exports = FourSquareApi;
