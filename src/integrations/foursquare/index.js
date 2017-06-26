const axios = require('axios');

const config = require('../../config');
const categories = require('./data').categories;

const { clientId, clientSecret, apiUrl } = config.FourSquare;

function request(url, data, method, parameters) {
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


function getCategoryId(name) {
    const category = categories.find(item => item.name.toLowerCase() === name);
    return category.id;
}

async function getNearest(coords, category) {
    const categoryId = getCategoryId(category);
    const { lat, long } = coords;
    const ll = [lat, long].join(',');
    const response = await get('/venues/search', { ll, categoryId, limit: 6, radius: 3000 });
    return response.data.response.venues;
}

module.exports = { getNearest };
