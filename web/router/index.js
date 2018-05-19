const { sanitizeRequestObj } = require('../middleware');
const router = require('express').Router();

// requestLogger(router);

sanitizeRequestObj(router);

/** Open routes */
require('./api/common')(router);

// authorization(router);

/** Internal routes */
// require('./api')(router);

/**
 * Mounting respective paths.
 * @param {object} app Express instance
 */
module.exports = (app) => {
  app.use('/api/v1', router);
};