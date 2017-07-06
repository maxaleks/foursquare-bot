const winston = require('winston');
const path = require('path');

winston.emitErrs = true;

const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'error',
            filename: path.join(__dirname, '../../', 'logs', 'errors.log'),
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 2,
            colorize: false,
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
        }),
    ],
    exitOnError: false,
});

module.exports = logger;
module.exports.stream = {
    write(message) {
        logger.info(message);
    },
};
