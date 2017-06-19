module.exports = {
    development: {
        username: 'postgres',
        password: null,
        database: 'foursquare_bot_development',
        host: process.env.HOST || '127.0.0.1',
        dialect: 'postgresql',
    },
    test: {
        username: 'postgres',
        password: '',
        database: 'foursquare_bot_test',
        host: process.env.HOST || '127.0.0.1',
        dialect: 'postgresql',
    },
    production: {
        username: 'postgres',
        password: '',
        database: 'foursquare_bot_production',
        host: process.env.HOST || '127.0.0.1',
        dialect: 'postgresql',
    },
};
