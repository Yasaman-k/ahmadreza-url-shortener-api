require('dotenv/config');
const { Logger, morganMiddleware } = require('@lo-agency/logger');

module.exports = {
    Logger,
    morganMiddleware
}