const axios = require('axios');

const config = require('../../config');

const { clientId, clientSecret, apiUrl } = config.FourSquare;

function request(url, data, method, parameters = {}) {
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

function get(url, params) {
    return request(url, null, 'GET', params);
}

async function getNearest(coords, categoryId) {
    const { lat, long } = coords;
    const ll = [lat, long].join(',');
    const response = await get('/venues/search', { ll, categoryId, limit: 6, radius: 3000 });
    return response.data.response.venues;
}

function filterCategories(tree) {
    const desired = ['breakfast', 'diner', 'coffee shop', 'fast food', 'restaurant', 'bar'];
    let founded = [];
    tree.forEach((item) => {
        if (item.categories) {
            founded = [...founded, ...filterCategories(item.categories)];
        }
        if (desired.includes(item.shortName.toLowerCase())) {
            founded.push(item);
        }
    });
    return founded;
}

async function getCategories() {
    const categories = (await get('/venues/categories')).data.response.categories;
    return filterCategories(categories).map(item => ({ externalId: item.id, name: item.shortName.toLowerCase() }));
}

module.exports = { getNearest, getCategories };
